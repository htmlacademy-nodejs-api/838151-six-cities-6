import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentDto, CommentEntity } from './index.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
}
