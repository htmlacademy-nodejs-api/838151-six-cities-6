import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUserValidationMessage } from './create-user.message.js';
import { UserType } from '../../../types/user-type.enum.js';

export class CreateUserDto {
  @IsEmail({}, { message: CreateUserValidationMessage.email.invalid })
  public email: string;

  @IsString({ message: CreateUserValidationMessage.name.invalid })
  @MinLength(1, { message: CreateUserValidationMessage.name.minLength })
  @MaxLength(15, { message: CreateUserValidationMessage.name.maxLength })
  public name: string;

  @IsString({ message: CreateUserValidationMessage.password.invalid })
  @MinLength(6, { message: CreateUserValidationMessage.password.minLength })
  @MaxLength(12, { message: CreateUserValidationMessage.password.maxLength })
  public password: string;

  @IsEnum(UserType, { message: CreateUserValidationMessage.type.invalid })
  public userType: UserType;
}
