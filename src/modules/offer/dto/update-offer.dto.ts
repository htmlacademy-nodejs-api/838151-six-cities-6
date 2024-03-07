import {
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsArray,
  ArrayMinSize,
  IsNumber,
  Min,
  Max,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { AmenitiesType } from '../../../types/amenities.enum.js';
import { CityType } from '../../../types/city-type.type.js';
import { ObjectType } from '../../../types/object-type.enum.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { Expose } from 'class-transformer';
import {CONSTANTS} from './constants.js';

export class UpdateOfferDto {
  @Expose()
  @IsString({ message: CreateOfferValidationMessage.title.invalid })
  @MinLength(CONSTANTS.TITLE.MIN_LENGTH, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(CONSTANTS.TITLE.MAX_LENGTH, { message: CreateOfferValidationMessage.title.maxLength })
  @IsOptional()
  public title?: string;

  @Expose()
  @IsString({ message: CreateOfferValidationMessage.description.invalid })
  @MinLength(CONSTANTS.DESCRIPTION.MIN_LENGTH, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(CONSTANTS.DESCRIPTION.MAX_LENGTH, { message: CreateOfferValidationMessage.description.maxLength })
  @IsOptional()
  public description?: string;

  @Expose()
  @IsOptional({ message: CreateOfferValidationMessage.city.invalid })
  public city?: CityType;

  @Expose()
  @IsString({ message: CreateOfferValidationMessage.previewImage.invalid })
  @MaxLength(CONSTANTS.PREVIEW_IMAGE.MAX_LENGTH, { message: CreateOfferValidationMessage.previewImage.maxLength })
  @IsOptional()
  public previewImage?: string;

  @Expose()
  @IsArray()
  @ArrayMinSize(CONSTANTS.IMAGES.MIN_COUNT, { message: CreateOfferValidationMessage.propertyPhotos.minLength })
  @IsString({ each: true, message: CreateOfferValidationMessage.propertyPhotos.invalid })
  @IsOptional()
  public images?: string[];

  @Expose()
  @IsEnum(ObjectType, { message: CreateOfferValidationMessage.objectType.invalid })
  @IsOptional()
  public type?: ObjectType;

  @Expose()
  @IsNumber({}, { message: CreateOfferValidationMessage.numberOfRooms.invalid })
  @Min(CONSTANTS.BEDROOMS.MIN_VALUE, { message: CreateOfferValidationMessage.numberOfRooms.min })
  @Max(CONSTANTS.BEDROOMS.MAX_VALUE, { message: CreateOfferValidationMessage.numberOfRooms.max })
  @IsOptional()
  public bedrooms?: number;

  @Expose()
  @IsNumber({}, { message: CreateOfferValidationMessage.numberOfGuests.invalid })
  @Min(CONSTANTS.MAX_ADULTS.MIN_VALUE, { message: CreateOfferValidationMessage.numberOfGuests.min })
  @Max(CONSTANTS.MAX_ADULTS.MAX_VALUE, { message: CreateOfferValidationMessage.numberOfGuests.max })
  @IsOptional()
  public maxAdults?: number;

  @Expose()
  @IsNumber({}, { message: CreateOfferValidationMessage.rentalCost.invalid })
  @Min(CONSTANTS.PRICE.MIN_VALUE, { message: CreateOfferValidationMessage.rentalCost.min })
  @Max(CONSTANTS.PRICE.MAX_VALUE, { message: CreateOfferValidationMessage.rentalCost.max })
  @IsOptional()
  public price?: number;

  @Expose()
  @IsArray()
  @ArrayMinSize(CONSTANTS.GOODS.MIN_COUNT, { message: CreateOfferValidationMessage.amenities.minLength })
  @IsEnum(AmenitiesType, {
    each: true,
    message: CreateOfferValidationMessage.amenities.invalid,
  })
  @IsOptional()
  public goods?: AmenitiesType[];

  @Expose()
  @ValidateNested({ message: CreateOfferValidationMessage.location.invalid })
  @IsOptional()
  public location?: { latitude: number; longitude: number };
}
