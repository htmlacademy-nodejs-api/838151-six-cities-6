import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { OfferService } from './offer-service.interface.js';
import { CreateOfferDto, UpdateOfferDto } from './index.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.find,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.findById,
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.favoriteOffers,
    });
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Patch,
      handler: this.switchFavorite,
    });
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.findPremiumOffersByCity,
    });
  }

  public async find(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async findById(
    { params }: Request<ParamsDictionary, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async findPremiumOffersByCity(
    { params }: Request<ParamsDictionary, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.findPremiumOffersByCity(params.city);
    console.log(offer);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const newOffer = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, newOffer));
  }

  public async update(
    { body, params }: Request<ParamsDictionary, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async favoriteOffers(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  public async switchFavorite(
    _req: Request<ParamsDictionary, unknown, UpdateOfferDto>,
    _res: Response
  ): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  public async delete(
    { params }: Request<ParamsDictionary, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const deletedOffer = await this.offerService.deleteById(params.offerId);
    this.ok(res, fillDTO(OfferRdo, deletedOffer));
  }
}
