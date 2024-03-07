import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUserValidationMessage } from './create-user.message.js';
import { UserType } from '../../../types/user-type.enum.js';

const CONSTANTS = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 12,
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 15,
};

export class CreateUserDto {
  @IsEmail({}, { message: CreateUserValidationMessage.email.invalid })
  public email: string;

  @IsString({ message: CreateUserValidationMessage.name.invalid })
  @MinLength(CONSTANTS.MIN_NAME_LENGTH, { message: CreateUserValidationMessage.name.minLength })
  @MaxLength(CONSTANTS.MAX_NAME_LENGTH, { message: CreateUserValidationMessage.name.maxLength })
  public name: string;

  @IsString({ message: CreateUserValidationMessage.password.invalid })
  @MinLength(CONSTANTS.MIN_PASSWORD_LENGTH, { message: CreateUserValidationMessage.password.minLength })
  @MaxLength(CONSTANTS.MAX_PASSWORD_LENGTH, { message: CreateUserValidationMessage.password.maxLength })
  public password: string;

  @IsEnum(UserType, { message: CreateUserValidationMessage.type.invalid })
  public userType: UserType;
}
