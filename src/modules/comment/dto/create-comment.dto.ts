import { IsNumber, IsString, Min, Max, MaxLength, MinLength } from 'class-validator';
import { CreateCommentValidationMessage } from '../index.js';

const CONSTANTS = {
  COMMENT: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 1024,
  },
  RATING: {
    MIN: 1,
    MAX: 5,
  }
};

export class CreateCommentDto {
  @IsString({ message: CreateCommentValidationMessage.text.invalid })
  @MinLength(CONSTANTS.COMMENT.MIN_LENGTH, { message: CreateCommentValidationMessage.text.minLength })
  @MaxLength(CONSTANTS.COMMENT.MAX_LENGTH, { message: CreateCommentValidationMessage.text.maxLength })
  public comment: string;

  @IsNumber({}, { message: CreateCommentValidationMessage.rating.invalid })
  @Min(CONSTANTS.RATING.MIN, { message: CreateCommentValidationMessage.rating.min })
  @Max(CONSTANTS.RATING.MAX, { message: CreateCommentValidationMessage.rating.max })
  public rating: number;

  public offerId: string;

  public userId: string;
}
