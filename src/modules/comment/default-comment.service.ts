import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity, CreateCommentDto } from './index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(
    dto: CreateCommentDto
  ): Promise<DocumentType<CommentEntity>> {
    const comment = new CommentEntity(dto);
    const result = await this.commentModel.create(comment);
    this.logger.info(`New comment created: ${comment.text}`);

    return result;
  }

  public async findByOfferId(
    id: string
  ): Promise<DocumentType<CommentEntity>[] | null> {
    return this.commentModel.find({ id });
  }
}
