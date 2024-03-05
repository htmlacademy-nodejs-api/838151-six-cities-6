import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import mongoose, { ObjectId } from 'mongoose';
import { CityType } from '../../types/city-type.type.js';
import { ObjectType } from '../../types/object-type.enum.js';
import { AmenitiesType } from '../../types/amenities.enum.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, minlength: 10, maxlength: 100 })
  public title!: string;

  @prop({ required: true, minlength: 20, maxlength: 1024 })
  public description!: string;

  @prop({ required: true })
  public city!: CityType;

  @prop({ required: true, default: '' })
  public previewImage!: string;

  @prop({ required: true, default: '' })
  public images!: Array<string>;

  @prop({ required: true, default: false })
  public isPremium!: boolean;

  @prop({ required: true, default: 1, min: 1, max: 5 })
  public rating!: number;

  @prop({ required: true, default: '' })
  public type!: ObjectType;

  @prop({ required: true, default: 1, min: 1, max: 8 })
  public bedrooms!: number;

  @prop({ required: true, default: 1, min: 1, max: 10 })
  public maxAdults!: number;

  @prop({ required: true, default: 100, min: 100, max: 100000 })
  public price!: number;

  @prop({ required: true, default: AmenitiesType })
  public goods!: Array<AmenitiesType>;

  @prop({ required: true, type: mongoose.Types.ObjectId, ref: UserEntity })
  public host!: ObjectId;

  @prop({ default: 0 })
  public numberOfComments!: number;

  @prop({ required: true, default: {} })
  public location!: { latitude: number; longitude: number };
}

export const OfferModel = getModelForClass(OfferEntity);
