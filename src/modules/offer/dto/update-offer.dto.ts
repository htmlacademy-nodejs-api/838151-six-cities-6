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

export class UpdateOfferDto {
  @Expose()
  @IsString({ message: CreateOfferValidationMessage.title.invalid })
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  @IsOptional()
  public title?: string;

  @Expose()
  @IsString({ message: CreateOfferValidationMessage.description.invalid })
  @MinLength(10, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.description.maxLength })
  @IsOptional()
  public description?: string;

  @Expose()
  @IsOptional({ message: CreateOfferValidationMessage.city.invalid })
  public city?: CityType;

  @Expose()
  @IsString({ message: CreateOfferValidationMessage.previewImage.invalid })
  @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
  @IsOptional()
  public previewImage?: string;

  @Expose()
  @IsArray()
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.propertyPhotos.minLength })
  @IsString({ each: true, message: CreateOfferValidationMessage.propertyPhotos.invalid })
  @IsOptional()
  public images?: string[];

  @Expose()
  @IsEnum(ObjectType, { message: CreateOfferValidationMessage.objectType.invalid })
  @IsOptional()
  public type?: ObjectType;

  @Expose()
  @IsNumber({}, { message: CreateOfferValidationMessage.numberOfRooms.invalid })
  @Min(1, { message: CreateOfferValidationMessage.numberOfRooms.min })
  @Max(8, { message: CreateOfferValidationMessage.numberOfRooms.max })
  @IsOptional()
  public bedrooms?: number;

  @Expose()
  @IsNumber({}, { message: CreateOfferValidationMessage.numberOfGuests.invalid })
  @Min(1, { message: CreateOfferValidationMessage.numberOfGuests.min })
  @Max(10, { message: CreateOfferValidationMessage.numberOfGuests.max })
  @IsOptional()
  public maxAdults?: number;

  @Expose()
  @IsNumber({}, { message: CreateOfferValidationMessage.rentalCost.invalid })
  @Min(100, { message: CreateOfferValidationMessage.rentalCost.min })
  @Max(100000, { message: CreateOfferValidationMessage.rentalCost.max })
  @IsOptional()
  public price?: number;

  @Expose()
  @IsArray()
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.amenities.minLength })
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
