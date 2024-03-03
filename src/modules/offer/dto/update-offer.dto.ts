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
  IsEmpty,
} from 'class-validator';
import { AmenitiesType } from '../../../types/amenities.enum.js';
import { CityType } from '../../../types/city-type.enum.js';
import { ObjectType } from '../../../types/object-type.enum.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class UpdateOfferDto {
  @IsString({ message: CreateOfferValidationMessage.title.invalid })
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  @IsOptional()
  public title?: string;

  @IsString({ message: CreateOfferValidationMessage.description.invalid })
  @MinLength(10, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.description.maxLength })
  @IsOptional()
  public description?: string;

  @IsEnum(CityType, { message: CreateOfferValidationMessage.city.invalid })
  @IsOptional()
  public city?: CityType;

  @IsString({ message: CreateOfferValidationMessage.previewImage.invalid })
  @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
  @IsOptional()
  public previewImage?: string;

  @IsArray()
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.propertyPhotos.minLength })
  @IsString({ each: true, message: CreateOfferValidationMessage.propertyPhotos.invalid })
  @IsOptional()
  public propertyPhotos?: string[];

  @IsEmpty()
  @IsOptional()
  public numberOfComments?: number;

  @IsEmpty()
  @IsOptional()
  public rating?: number;

  @IsEmpty()
  @IsOptional()
  public premium?: boolean;

  @IsEnum(ObjectType, { message: CreateOfferValidationMessage.objectType.invalid })
  @IsOptional()
  public objectType?: ObjectType;

  @IsNumber({}, { message: CreateOfferValidationMessage.numberOfRooms.invalid })
  @Min(1, { message: CreateOfferValidationMessage.numberOfRooms.min })
  @Max(8, { message: CreateOfferValidationMessage.numberOfRooms.max })
  @IsOptional()
  public numberOfRooms?: number;

  @IsNumber({}, { message: CreateOfferValidationMessage.numberOfGuests.invalid })
  @Min(1, { message: CreateOfferValidationMessage.numberOfGuests.min })
  @Max(10, { message: CreateOfferValidationMessage.numberOfGuests.max })
  @IsOptional()
  public numberOfGuests?: number;

  @IsNumber({}, { message: CreateOfferValidationMessage.rentalCost.invalid })
  @Min(100, { message: CreateOfferValidationMessage.rentalCost.min })
  @Max(100000, { message: CreateOfferValidationMessage.rentalCost.max })
  @IsOptional()
  public rentalCost?: number;

  @IsArray()
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.amenities.minLength })
  @IsEnum(AmenitiesType, {
    each: true,
    message: CreateOfferValidationMessage.amenities.invalid,
  })
  @IsOptional()
  public amenities?: AmenitiesType[];

  @ValidateNested({ message: CreateOfferValidationMessage.location.invalid })
  @IsOptional()
  public locationCoordinates?: { latitude: number; longitude: number };
}
