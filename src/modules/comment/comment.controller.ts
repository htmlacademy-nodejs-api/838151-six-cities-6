import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { CommentService } from './comment-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo, CreateCommentDto } from './index.js';

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
    });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async findByOfferId(req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(req.params.offerId);
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    const newComment = await this.commentService.create(body);
    this.created(res, fillDTO(CommentRdo, newComment));
  }
}
