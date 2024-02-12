import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import {
  generateRandomValue,
  getRandomBoolean,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';

const MIN_RAITING = 1;
const MAX_RAITING = 5;

const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 8;

const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 10;

const MIN_RENT_PRICE = 100;
const MAX_RENT_PRICE = 100000;

const MIN_COMMENT_COUNT = 1;
const MAX_COMMENT_COUNT = 1000;

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
    const rating = generateRandomValue(MIN_RAITING, MAX_RAITING).toString();
    const objectType = getRandomItem<string>(this.mockData.types);
    const numberOfRooms = generateRandomValue(
      MIN_ROOM_COUNT,
      MAX_ROOM_COUNT
    ).toString();
    const numberOfGuests = generateRandomValue(
      MIN_GUEST_COUNT,
      MAX_GUEST_COUNT
    ).toString();
    const rentalCost = generateRandomValue(
      MIN_RENT_PRICE,
      MAX_RENT_PRICE
    ).toString();
    const amenities = getRandomItems<string>(this.mockData.amenities);
    const author = getRandomItem<string>(this.mockData.users);
    const numberOfComments = generateRandomValue(
      MIN_COMMENT_COUNT,
      MAX_COMMENT_COUNT
    ).toString();
    const locationCoordinates = getRandomItem<string>(
      this.mockData.coordinates
    );

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
