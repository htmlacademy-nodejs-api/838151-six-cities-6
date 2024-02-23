import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { CommentEntity } from '../comment/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
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

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
              { $project: { _id: 1 } },
            ],
            as: 'comments',
          },
        },
        {
          $addFields: {
            numberOfComments: { $size: '$comments' },
          },
        },
        {
          $project: {
            comments: 0,
          },
        },
      ])
      .exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findOne({ _id: offerId }).exec();
  }

  public async findPremiumOffersByCity(
    city: string
  ): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel.find({ city: city, premium: true }).exec();
  }

  public async findFavoriteOffers(): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel.find({ isFavorite: true });
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, { new: true }).exec();
  }

  public async switchFavorite(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.findById(offerId);
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    this.commentModel.deleteMany({ offerId: offerId }).exec();
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }
}
