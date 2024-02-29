import { IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';
import mongoose from 'mongoose';
import { CreateCommentValidationMessage } from '../index.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentValidationMessage.text.invalid })
  @MinLength(5, { message: CreateCommentValidationMessage.text.minLength })
  @MaxLength(1024, { message: CreateCommentValidationMessage.text.maxLength })
  public text: string;

  @IsMongoId({ message: CreateCommentValidationMessage.offerId.invalid })
  public offerId: mongoose.Types.ObjectId;

  @IsMongoId({ message: CreateCommentValidationMessage.userId.invalid })
  public userId: mongoose.Types.ObjectId;
}
