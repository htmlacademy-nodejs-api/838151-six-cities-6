import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto, UpdateOfferDto } from './index.js';
import { OfferEntity } from './offer.entity.js';
import { DocumentExists } from '../../types/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  find(count?: number, userId?: string): Promise<DocumentType<OfferEntity>[] | null>;
  findPremiumOffersByCity(city: string): Promise<DocumentType<OfferEntity>[] | null>;
  findFavoriteOffers(userId: string): Promise<DocumentType<OfferEntity>[] | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  incRatingCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findById(id: string, userId?: string): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
