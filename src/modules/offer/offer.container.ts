import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { DefaultOfferService } from './index.js';
import { OfferService } from './offer-service.interface.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { Controller } from '../../libs/rest/index.js';
import { OfferController } from './offer.controller.js';

export function createOfferContainer() {
  const offerContainer = new Container();
  offerContainer
    .bind<OfferService>(Component.OfferService)
    .to(DefaultOfferService)
    .inSingletonScope();
  offerContainer
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController);

  return offerContainer;
}
