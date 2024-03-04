import { inject, injectable } from 'inversify';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpError,
  HttpMethod,
  UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { OfferService } from './offer-service.interface.js';
import { CreateOfferDto, UpdateOfferDto, UploadImageRdo } from './index.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/private-route.middleware.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { UserService } from '../user/index.js';
import { DEFAULT_OFFER_COUNT } from './offer.constants.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.UserService) private readonly userService: UserService
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
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.favoriteOffers,
    });
    this.addRoute({
      path: '/:offerId/favorites',
      method: HttpMethod.Patch,
      handler: this.switchFavorite,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.findPremiumOffersByCity,
    });
    this.addRoute({
      path: '/:offerId/image',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ],
    });
  }

  public async find({ tokenPayload, query }: Request, res: Response): Promise<void> {
    let count: number = DEFAULT_OFFER_COUNT;
    if (query && typeof query.count === 'string') {
      count = parseInt(query.count, 10);
    }
    const offers = await this.offerService.find(count, tokenPayload?.id);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async findById(
    { params, tokenPayload }: Request<ParamsDictionary, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId, tokenPayload?.id);

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async findPremiumOffersByCity(
    { params }: Request<ParamsDictionary, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.findPremiumOffersByCity(params.city);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async create(
    { body, tokenPayload }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, author: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async update(
    { body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }
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
    { params, tokenPayload }: Request<ParamOfferId, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }
    const result = await this.userService.switchFavorite(offerId, tokenPayload.id);
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async uploadImage({ params, file }: Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const updateDto = { previewImage: file?.filename };
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadImageRdo, updateDto));
  }
}
