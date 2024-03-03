import { IsNumber, IsString, Min, Max, MaxLength, MinLength } from 'class-validator';
import { CreateCommentValidationMessage } from '../index.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentValidationMessage.text.invalid })
  @MinLength(5, { message: CreateCommentValidationMessage.text.minLength })
  @MaxLength(1024, { message: CreateCommentValidationMessage.text.maxLength })
  public text: string;

  @IsNumber({}, { message: CreateCommentValidationMessage.rating.invalid })
  @Min(1, { message: CreateCommentValidationMessage.rating.min })
  @Max(5, { message: CreateCommentValidationMessage.rating.max })
  public rating: number;

  public offerId: string;

  public userId: string;
}
