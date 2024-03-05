import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  HttpMethod,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { CommentService } from './comment-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo, CreateCommentDto } from './index.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/private-route.middleware.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.findByOfferId,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateCommentDto),
      ],
    });
  }

  public async findByOfferId(req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(req.params.offerId);
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
  }

  public async create(
    { params, tokenPayload, body }: CreateCommentRequest,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const result = await this.commentService.create(offerId, {
      ...body,
      userId: tokenPayload.id,
      offerId: offerId,
    });
    const comment = await this.commentService.findById(result.id);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
