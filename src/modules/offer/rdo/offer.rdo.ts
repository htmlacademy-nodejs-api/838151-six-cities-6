import { Expose, Transform, Type } from 'class-transformer';
import { CityType } from '../../../types/city-type.enum.js';
import { ObjectType } from '../../../types/object-type.enum.js';
import { AmenitiesType } from '../../../types/amenities.enum.js';
import mongoose from 'mongoose';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose({ name: '_id' })
  @Transform((value) => {
    if ('value' in value) {
      return value.value instanceof mongoose.Types.ObjectId
        ? value.obj._id.toHexString()
        : value.obj._id.toString();
    }

    return 'unknown value';
  })
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: number;

  @Expose()
  public city: CityType;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose({ name: 'favorite' })
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: ObjectType;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: AmenitiesType[];

  @Expose()
  @Type(() => UserRdo)
  public host: UserRdo;

  @Expose()
  public numberOfComments: number;

  @Expose()
  public location: { latitude: number; longitude: number };
}
