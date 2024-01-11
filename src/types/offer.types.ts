import {UserType} from './user.types.js';

export type OfferType = {
  title: string;
  description: string;
  publicationDate: string;
  city: "Paris" | "Cologne" | "Brussels" | "Amsterdam" | "Hamburg" | "Dusseldorf";
  previewImage: string;
  propertyPhotos: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  propertyType: "apartment" | "house" | "room" | "hotel";
  numberOfRooms: number;
  numberOfGuests: number;
  rentalCost: number;
  amenities: ("Breakfast" | "Air conditioning" | "Laptop friendly workspace" | "Baby seat" | "Washer" | "Towels" | "Fridge")[];
  author: UserType;
  numberOfComments: number;
  locationCoordinates: { latitude: number; longitude: number };
};
