import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentDto } from './index.js';
import { CommentEntity } from './comment.entity.js';

export interface CommentService {
  create(offerId: string, dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  findById(commentId: string): Promise<DocumentType<CommentEntity> | null>;
}
