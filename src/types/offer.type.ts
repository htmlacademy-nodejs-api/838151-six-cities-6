import { AmenitiesType } from './amenities.enum.js';
import { CityType } from './city-type.enum.js';
import { ObjectType } from './object-type.enum.js';

export type Offer = {
  title: string;
  description: string;
  publicationDate: string;
  city: CityType;
  previewImage: string;
  propertyPhotos: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  objectType: ObjectType;
  numberOfRooms: number;
  numberOfGuests: number;
  rentalCost: number;
  amenities: AmenitiesType[];
  author: string;
  numberOfComments: number;
  locationCoordinates: { latitude: number; longitude: number };
};
