import { AmenitiesType } from '../../../types/amenities.enum.js';
import { CityType } from '../../../types/city-type.type.js';
import { ObjectType } from '../../../types/object-type.enum.js';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateOfferValidationMessage } from '../index.js';
import {CONSTANTS} from './constants.js';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString({ message: CreateOfferValidationMessage.title.invalid })
  @MinLength(CONSTANTS.TITLE.MIN_LENGTH, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(CONSTANTS.TITLE.MAX_LENGTH, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @IsNotEmpty()
  @IsString({ message: CreateOfferValidationMessage.description.invalid })
  @MinLength(CONSTANTS.DESCRIPTION.MIN_LENGTH, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(CONSTANTS.DESCRIPTION.MAX_LENGTH, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsNotEmpty({ message: CreateOfferValidationMessage.city.invalid })
  public city: CityType;

  @IsBoolean()
  public isPremium: boolean;

  @IsNotEmpty()
  @IsString({ message: CreateOfferValidationMessage.previewImage.invalid })
  @MaxLength(CONSTANTS.PREVIEW_IMAGE.MAX_LENGTH, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(CONSTANTS.IMAGES.MIN_COUNT, { message: CreateOfferValidationMessage.propertyPhotos.minLength })
  @IsString({ each: true, message: CreateOfferValidationMessage.propertyPhotos.invalid })
  public images: string[];

  @IsNotEmpty()
  @IsEnum(ObjectType, { message: CreateOfferValidationMessage.objectType.invalid })
  public type: ObjectType;

  @IsNotEmpty()
  @IsNumber({}, { message: CreateOfferValidationMessage.numberOfRooms.invalid })
  @Min(CONSTANTS.BEDROOMS.MIN_VALUE, { message: CreateOfferValidationMessage.numberOfRooms.min })
  @Max(CONSTANTS.BEDROOMS.MAX_VALUE, { message: CreateOfferValidationMessage.numberOfRooms.max })
  public bedrooms: number;

  @IsNotEmpty()
  @IsNumber({}, { message: CreateOfferValidationMessage.numberOfGuests.invalid })
  @Min(CONSTANTS.MAX_ADULTS.MIN_VALUE, { message: CreateOfferValidationMessage.numberOfGuests.min })
  @Max(CONSTANTS.MAX_ADULTS.MAX_VALUE, { message: CreateOfferValidationMessage.numberOfGuests.max })
  public maxAdults: number;

  @IsNotEmpty()
  @IsNumber({}, { message: CreateOfferValidationMessage.rentalCost.invalid })
  @Min(CONSTANTS.PRICE.MIN_VALUE, { message: CreateOfferValidationMessage.rentalCost.min })
  @Max(CONSTANTS.PRICE.MAX_VALUE, { message: CreateOfferValidationMessage.rentalCost.max })
  public price: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(CONSTANTS.GOODS.MIN_COUNT, { message: CreateOfferValidationMessage.amenities.minLength })
  @IsEnum(AmenitiesType, {
    each: true,
    message: CreateOfferValidationMessage.amenities.invalid,
  })
  public goods: AmenitiesType[];

  public host: string;

  @IsNotEmpty()
  @ValidateNested({ message: CreateOfferValidationMessage.location.invalid })
  public location: { latitude: number; longitude: number };
}
