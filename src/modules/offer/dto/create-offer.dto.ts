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

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString({ message: CreateOfferValidationMessage.title.invalid })
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @IsNotEmpty()
  @IsString({ message: CreateOfferValidationMessage.description.invalid })
  @MinLength(10, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsNotEmpty({ message: CreateOfferValidationMessage.city.invalid })
  public city: CityType;

  @IsBoolean()
  public isPremium: boolean;

  @IsNotEmpty()
  @IsString({ message: CreateOfferValidationMessage.previewImage.invalid })
  @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.propertyPhotos.minLength })
  @IsString({ each: true, message: CreateOfferValidationMessage.propertyPhotos.invalid })
  public images: string[];

  @IsNotEmpty()
  @IsEnum(ObjectType, { message: CreateOfferValidationMessage.objectType.invalid })
  public type: ObjectType;

  @IsNotEmpty()
  @IsNumber({}, { message: CreateOfferValidationMessage.numberOfRooms.invalid })
  @Min(1, { message: CreateOfferValidationMessage.numberOfRooms.min })
  @Max(8, { message: CreateOfferValidationMessage.numberOfRooms.max })
  public bedrooms: number;

  @IsNotEmpty()
  @IsNumber({}, { message: CreateOfferValidationMessage.numberOfGuests.invalid })
  @Min(1, { message: CreateOfferValidationMessage.numberOfGuests.min })
  @Max(10, { message: CreateOfferValidationMessage.numberOfGuests.max })
  public maxAdults: number;

  @IsNotEmpty()
  @IsNumber({}, { message: CreateOfferValidationMessage.rentalCost.invalid })
  @Min(100, { message: CreateOfferValidationMessage.rentalCost.min })
  @Max(100000, { message: CreateOfferValidationMessage.rentalCost.max })
  public price: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.amenities.minLength })
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
