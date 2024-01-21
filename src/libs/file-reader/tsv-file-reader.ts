import { AmenitiesType } from '../../types/amenities.enum.js';
import { CityType } from '../../types/city-type.enum.js';
import { ObjectType } from '../../types/object-type.enum.js';
import { Offer } from '../../types/offer.type.js';
import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
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
        ]) => ({
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
        })
      );
  }
}
