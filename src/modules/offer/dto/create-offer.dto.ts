import mongoose from 'mongoose';
import { AmenitiesType } from '../../../types/amenities.enum.js';
import { CityType } from '../../../types/city-type.enum.js';
import { ObjectType } from '../../../types/object-type.enum.js';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateOfferValidationMessage } from '../index.js';

export class CreateOfferDto {
  @IsString({ message: CreateOfferValidationMessage.title.invalid })
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @IsString({ message: CreateOfferValidationMessage.description.invalid })
  @MinLength(10, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString(
    {},
    { message: CreateOfferValidationMessage.publicationDate.invalidFormat }
  )
  public publicationDate: Date;

  @IsEnum(CityType, { message: CreateOfferValidationMessage.city.invalid })
  public city: CityType;

  @IsString({ message: CreateOfferValidationMessage.previewImage.invalid })
  @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsArray()
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.propertyPhotos.minLength })
  @IsString({ each: true, message: CreateOfferValidationMessage.propertyPhotos.invalid })
  public propertyPhotos: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.premium.invalid })
  public premium: boolean;

  @IsNumber({}, { message: CreateOfferValidationMessage.rating.invalid })
  @Min(1, { message: CreateOfferValidationMessage.rating.min })
  @Max(5, { message: CreateOfferValidationMessage.rating.max })
  public rating: number;

  @IsEnum(ObjectType, { message: CreateOfferValidationMessage.objectType.invalid })
  public objectType: ObjectType;

  @IsNumber({}, { message: CreateOfferValidationMessage.numberOfRooms.invalid })
  @Min(1, { message: CreateOfferValidationMessage.numberOfRooms.min })
  @Max(8, { message: CreateOfferValidationMessage.numberOfRooms.max })
  public numberOfRooms: number;

  @IsNumber({}, { message: CreateOfferValidationMessage.numberOfGuests.invalid })
  @Min(1, { message: CreateOfferValidationMessage.numberOfGuests.min })
  @Max(10, { message: CreateOfferValidationMessage.numberOfGuests.max })
  public numberOfGuests: number;

  @IsNumber({}, { message: CreateOfferValidationMessage.rentalCost.invalid })
  @Min(100, { message: CreateOfferValidationMessage.rentalCost.min })
  @Max(100000, { message: CreateOfferValidationMessage.rentalCost.max })
  public rentalCost: number;

  @IsArray()
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.amenities.minLength })
  @IsEnum(AmenitiesType, {
    each: true,
    message: CreateOfferValidationMessage.amenities.invalid,
  })
  public amenities: AmenitiesType[];

  @IsMongoId({ message: CreateOfferValidationMessage.author.invalid })
  public author: mongoose.Types.ObjectId;

  @ValidateNested({ message: CreateOfferValidationMessage.location.invalid })
  public locationCoordinates: { latitude: number; longitude: number };
}
