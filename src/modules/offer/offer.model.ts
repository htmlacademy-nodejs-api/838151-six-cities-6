import { Schema, Document, model } from 'mongoose';
import { Offer } from '../../types/index.js';
import { ObjectType } from '../../types/object-type.enum.js';
import { CityType } from '../../types/city-type.enum.js';
import { AmenitiesType } from '../../types/amenities.enum.js';

export interface OfferDocument extends Offer, Document {}

const offerSchema = new Schema({
  title: String,
  description: String,
  publicationDate: String,
  city: CityType,
  previewImage: String,
  propertyPhotos: Array(String),
  premium: Boolean,
  favorite: Boolean,
  rating: Number,
  objectType: ObjectType,
  numberOfRooms: Number,
  numberOfGuests: Number,
  rentalCost: Number,
  amenities: Array(AmenitiesType),
  author: String,
  numberOfComments: Number,
  locationCoordinates: { latitude: Number, longitude: Number },
});

export const OfferModel = model<OfferDocument>('User', offerSchema);
