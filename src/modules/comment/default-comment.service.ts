import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity, CreateCommentDto } from './index.js';
import { SortType } from '../../types/sort-type.enum.js';
import { OfferService } from '../offer/offer-service.interface.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    await this.offerService.incCommentCount(dto.offerId);
    this.logger.info(`New comment created: ${dto.text}`);

    return result;
  }

  public async findById(commentId: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel.findOne({ _id: commentId }).exec();
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .populate('userId')
      .sort({ createdAt: SortType.Down });
  }
}
