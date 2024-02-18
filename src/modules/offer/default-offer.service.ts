import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DEFAULT_OFFER_COUNT } from './offer.constants.js';
import { SortType } from '../../types/sort-type.enum.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
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

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find()
      .sort({ publicationDate: SortType.Down })
      .limit(limit)
      .select(
        'title rentalCost type isFavorite publicationDate city previewImage isPremium numberOfComments'
      )
      .exec();
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findOne({ id });
  }

  public async findPremiumOffersByCity(
    city: string
  ): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel.find({ city: city, isPremium: true });
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

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }
}
