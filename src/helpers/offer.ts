import { AmenitiesType } from '../types/amenities.enum.js';
import { CityType } from '../types/city-type.enum.js';
import { Offer } from '../types/index.js';
import { ObjectType } from '../types/object-type.enum.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    publicationDate,
    city,
    previewImage,
    propertyPhotos,
    premium,
    favorite,
    rating,
    objectType,
    numberOfRooms,
    numberOfGuests,
    rentalCost,
    amenities,
    author,
    numberOfComments,
    locationCoordinates,
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    publicationDate,
    city: CityType[city as keyof typeof CityType],
    previewImage,
    propertyPhotos: propertyPhotos.split(','),
    premium: premium === premium,
    favorite: favorite === favorite,
    rating: Number.parseFloat(rating),
    objectType: ObjectType[objectType as keyof typeof ObjectType],
    numberOfRooms: Number.parseInt(numberOfRooms, 10),
    numberOfGuests: Number.parseInt(numberOfGuests, 10),
    rentalCost: Number.parseInt(rentalCost, 10),
    amenities: amenities
      .split(',')
      .map((name) =>
        name
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('')
      )
      .map((name) => AmenitiesType[name as keyof typeof AmenitiesType]),
    author,
    numberOfComments: Number.parseInt(numberOfComments, 10),
    locationCoordinates: {
      latitude: Number.parseFloat(locationCoordinates.split(',')[0]),
      longitude: Number.parseFloat(locationCoordinates.split(',')[1]),
    },
  };
}
