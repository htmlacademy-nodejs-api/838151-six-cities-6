import { TSVFileReader } from '../../libs/file-reader/tsv-file-reader.js';
import { Command } from './command.interface.js';
import { getErrorMessage, getMongoURI } from '../../helpers/index.js';
import { createOffer } from '../../helpers/offer.js';
import { UserService } from '../../modules/user/user-service.interface.js';
import { OfferService } from '../../modules/offer/offer-service.interface.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../../libs/database-client/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DefaultOfferService, OfferModel } from '../../modules/offer/index.js';
import { DefaultUserService, UserModel } from '../../modules/user/index.js';
import { Offer } from '../../types/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { UserType } from '../../types/user-type.enum.js';
import { ConsoleLogger } from '../../libs/logger/console.logger.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    console.log(offer);
    const user = await this.userService.findOrCreate(
      {
        email: offer.author,
        name: offer.author,
        avatar: '',
        userType: UserType.Normal,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt
    );

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      publicationDate: offer.publicationDate,
      city: offer.city,
      previewImage: offer.previewImage,
      propertyPhotos: offer.propertyPhotos,
      premium: offer.premium,
      favorite: offer.favorite,
      rating: offer.rating,
      objectType: offer.objectType,
      numberOfRooms: offer.numberOfRooms,
      numberOfGuests: offer.numberOfGuests,
      rentalCost: offer.rentalCost,
      amenities: offer.amenities,
      author: user.id,
      numberOfComments: offer.numberOfComments,
      locationCoordinates: {
        latitude: offer.locationCoordinates.latitude,
        longitude: offer.locationCoordinates.longitude,
      },
    });
  }

  public getName(): string {
    return '--import';
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);
    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
