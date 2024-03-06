import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import {
  generateRandomValue,
  getRandomBoolean,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';

const CONSTANTS = {
  RATING: {
    MIN: 1,
    MAX: 5
  },
  ROOM_COUNT: {
    MIN: 1,
    MAX: 8
  },
  GUEST_COUNT: {
    MIN: 1,
    MAX: 10
  },
  RENT_PRICE: {
    MIN: 100,
    MAX: 100000
  },
  COMMENT_COUNT: {
    MIN: 1,
    MAX: 1000
  }
};

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publicationDate = new Date().toDateString();
    const city = getRandomItem<string>(this.mockData.citys);
    const previewImage = getRandomItem<string>(this.mockData.images);
    const propertyPhotos = getRandomItems<string>(this.mockData.images);
    const premium = getRandomBoolean();
    const favorite = getRandomBoolean();
    const rating = generateRandomValue(CONSTANTS.RATING.MIN, CONSTANTS.RATING.MAX).toString();
    const objectType = getRandomItem<string>(this.mockData.types);
    const numberOfRooms = generateRandomValue(CONSTANTS.ROOM_COUNT.MIN, CONSTANTS.ROOM_COUNT.MAX).toString();
    const numberOfGuests = generateRandomValue(CONSTANTS.GUEST_COUNT.MIN, CONSTANTS.GUEST_COUNT.MAX).toString();
    const rentalCost = generateRandomValue(CONSTANTS.RENT_PRICE.MIN, CONSTANTS.RENT_PRICE.MAX).toString();
    const amenities = getRandomItems<string>(this.mockData.amenities);
    const author = getRandomItem<string>(this.mockData.users);
    const numberOfComments = generateRandomValue(CONSTANTS.COMMENT_COUNT.MIN, CONSTANTS.COMMENT_COUNT.MAX).toString();
    const locationCoordinates = getRandomItem<string>(this.mockData.coordinates);

    return [
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
    ].join('\t');
  }
}
