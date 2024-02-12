import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import { Offer } from '../../types/index.js';
import { now } from 'mongoose';
import { CityType } from '../../types/city-type.enum.js';
import { ObjectType } from '../../types/object-type.enum.js';
import { AmenitiesType } from '../../types/amenities.enum.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({ required: true, minlength: 10, maxlength: 100 })
  public title: string;

  @prop({ required: true, minlength: 20, maxlength: 1024 })
  public description: string;

  @prop({ required: true, default: now })
  public publicationDate: string;

  @prop({ required: true, default: '' })
  public city: CityType;

  @prop({ required: true, default: '' })
  public previewImage: string;

  @prop({ required: true, default: '' })
  public propertyPhotos: Array<string>;

  @prop({ required: true, default: false })
  public premium: boolean;

  @prop({ required: true, default: false })
  public favorite: boolean;

  @prop({ required: true, default: 1, min: 1, max: 5 })
  public rating: number;

  @prop({ required: true, default: '' })
  public objectType: ObjectType;

  @prop({ required: true, default: 1, min: 1, max: 8 })
  public numberOfRooms: number;

  @prop({ required: true, default: 1, min: 1, max: 10 })
  public numberOfGuests: number;

  @prop({ required: true, default: 100, min: 100, max: 100000 })
  public rentalCost: number;

  @prop({ required: true, default: AmenitiesType })
  public amenities: Array<AmenitiesType>;

  @prop({ required: true, default: '' })
  public author: string;

  @prop({ default: 0 })
  public numberOfComments: number;

  @prop({ required: true, default: {} })
  public locationCoordinates: { latitude: number; longitude: number };

  constructor(offerData: Offer) {
    super();

    this.title = offerData.title;
    this.description = offerData.description;
    this.publicationDate = offerData.publicationDate;
    this.city = offerData.city;
    this.previewImage = offerData.previewImage;
    this.propertyPhotos = offerData.propertyPhotos;
    this.premium = offerData.premium;
    this.favorite = offerData.favorite;
    this.rating = offerData.rating;
    this.objectType = offerData.objectType;
    this.numberOfRooms = offerData.numberOfRooms;
    this.numberOfGuests = offerData.numberOfGuests;
    this.rentalCost = offerData.rentalCost;
    this.amenities = offerData.amenities;
    this.author = offerData.author;
    this.numberOfComments = offerData.numberOfComments;
    this.locationCoordinates = offerData.locationCoordinates;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
