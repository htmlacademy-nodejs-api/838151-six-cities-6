import { AmenitiesType } from '../../../types/amenities.enum.js';
import { CityType } from '../../../types/city-type.enum.js';
import { ObjectType } from '../../../types/object-type.enum.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public publicationDate?: string;
  public city?: CityType;
  public previewImage?: string;
  public propertyPhotos?: string[];
  public premium?: boolean;
  public favorite?: boolean;
  public rating?: number;
  public objectType?: ObjectType;
  public numberOfRooms?: number;
  public numberOfGuests?: number;
  public rentalCost?: number;
  public amenities?: AmenitiesType[];
  public author?: string;
  public locationCoordinates?: { latitude?: number; longitude?: number };
}
