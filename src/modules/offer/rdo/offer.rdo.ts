import { Expose } from 'class-transformer';
import { CityType } from '../../../types/city-type.enum.js';
import { ObjectType } from '../../../types/object-type.enum.js';
import { AmenitiesType } from '../../../types/amenities.enum.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: number;

  @Expose()
  public city: CityType;

  @Expose()
  public previewImage: string;

  @Expose()
  public propertyPhotos: string[];

  @Expose()
  public premium: boolean;

  @Expose()
  public favorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public objectType: ObjectType;

  @Expose()
  public numberOfRooms: number;

  @Expose()
  public numberOfGuests: number;

  @Expose()
  public rentalCost: number;

  @Expose()
  public amenities: AmenitiesType[];

  @Expose()
  public author: string;

  @Expose()
  public numberOfComments: number;

  @Expose()
  public locationCoordinates: { latitude: number; longitude: number };
}
