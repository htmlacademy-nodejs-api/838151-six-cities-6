import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { CommentEntity } from '../comment/index.js';
import mongoose from 'mongoose';
import { UserEntity } from '../user/index.js';
import { plainToInstance } from 'class-transformer';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.UserModel)
    private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const newOffer = dto;
    const result = await this.offerModel.create(newOffer);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async incCommentCount(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $inc: {
          numberOfComments: 1,
        },
      })
      .exec();
  }

  public async incRatingCount(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    const comments = await this.commentModel.find({ offerId: offerId }).exec();

    if (comments.length === 0) {
      return null;
    }

    const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);

    const averageRating = (totalRating / comments.length).toFixed(1);

    const updatedOffer = await this.offerModel
      .findByIdAndUpdate(offerId, { rating: averageRating })
      .exec();

    return updatedOffer;
  }

  public async find(
    count: number,
    userId?: string
  ): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .aggregate([
        {
          $lookup: {
            as: 'matchedUsers',
            from: 'users',
            foreignField: 'favorites',
            localField: '_id',
          },
        },
        {
          $lookup: {
            as: 'host',
            from: 'users',
            foreignField: '_id',
            localField: 'host',
          },
        },
        {
          $addFields: {
            favorite: {
              $cond: {
                if: {
                  $gt: [
                    {
                      $size: {
                        $filter: {
                          input: '$matchedUsers',
                          as: 'user',
                          cond: { $eq: ['$$user._id', { $toObjectId: userId }] },
                        },
                      },
                    },
                    0,
                  ],
                },
                then: true,
                else: false,
              },
            },
            host: { $arrayElemAt: ['$host', 0] },
          },
        },
        {
          $limit: count,
        },
      ])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async findById(
    offerId: string,
    userId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel
      .aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(offerId) } },
        {
          $lookup: {
            as: 'matchedUsers',
            from: 'users',
            foreignField: 'favorites',
            localField: '_id',
          },
        },
        {
          $lookup: {
            as: 'host',
            from: 'users',
            foreignField: '_id',
            localField: 'host',
          },
        },
        {
          $addFields: {
            favorite: {
              $cond: {
                if: {
                  $gt: [
                    {
                      $size: {
                        $filter: {
                          input: '$matchedUsers',
                          as: 'user',
                          cond: { $eq: ['$$user._id', { $toObjectId: userId }] },
                        },
                      },
                    },
                    0,
                  ],
                },
                then: true,
                else: false,
              },
            },
            host: { $arrayElemAt: ['$host', 0] },
          },
        },
      ])
      .exec();

    return offer[0];
  }

  public async findPremiumOffersByCity(
    city: string
  ): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel.find({ 'city.name': city, premium: true }).exec();
  }

  public async findFavoriteOffers(
    userId: string
  ): Promise<DocumentType<OfferEntity>[] | null> {
    const user = await this.userModel.findById(userId).exec();

    if (user && user.favorites) {
      const offers = await this.offerModel
        .aggregate([
          { $match: { _id: { $in: user.favorites } } },
          {
            $lookup: {
              as: 'matchedUsers',
              from: 'users',
              foreignField: 'favorites',
              localField: '_id',
            },
          },
          {
            $addFields: {
              favorite: {
                $cond: {
                  if: {
                    $gt: [
                      {
                        $size: {
                          $filter: {
                            input: '$matchedUsers',
                            as: 'user',
                            cond: { $eq: ['$$user._id', { $toObjectId: userId }] },
                          },
                        },
                      },
                      0,
                    ],
                  },
                  then: true,
                  else: false,
                },
              },
            },
          },
        ])
        .exec();

      return offers;
    }

    return [];
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    const updaterOffer = plainToInstance(UpdateOfferDto, dto, {
      excludeExtraneousValues: true,
    });

    return this.offerModel.findByIdAndUpdate(offerId, updaterOffer, { new: true }).exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    this.commentModel.deleteMany({ offerId: offerId }).exec();
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }
}
