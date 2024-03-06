import { Logger } from '../libs/logger/index.js';
import { Config, RestSchema } from '../libs/config/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../types/index.js';
import { DatabaseClient } from '../libs/database-client/index.js';
import { getFullServerPath, getMongoURI } from '../helpers/index.js';
import express, { Express } from 'express';
import { Controller, ExceptionFilter } from '../libs/rest/index.js';
import { ParseTokenMiddleware } from '../libs/rest/middleware/parse-token.middleware.js';
import cors from 'cors';
import {ROUTES} from './rest.constant.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClient,
    @inject(Component.UserController) private readonly userController: Controller,
    @inject(Component.CommentController) private readonly commentController: Controller,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.ExceptionFilter)
    private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.AuthExceptionFilter)
    private readonly authExceptionFilter: ExceptionFilter,
    @inject(Component.HttpExceptionFilter)
    private readonly httpExceptionFilter: ExceptionFilter,
    @inject(Component.ValidationExceptionFilter)
    private readonly validationExceptionFilter: ExceptionFilter
  ) {
    this.server = express();
  }

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async _initControllers() {
    this.server.use('/comments', this.commentController.router);
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
  }

  private async _initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(
      this.config.get('JWT_SECRET')
    );
    this.server.use(express.json());
    this.server.use(
      ROUTES.STATIC_UPLOAD,
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.server.use(
      ROUTES.STATIC_FILES,
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.server.use(cors());
  }

  private async _initExceptionFilters() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(
      this.validationExceptionFilter.catch.bind(this.validationExceptionFilter)
    );
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization');

    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware');
    await this._initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this._initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this._initExceptionFilters();
    this.logger.info('Exception filters initialization compleated');

    this.logger.info('Try to init server…');
    await this._initServer();
    this.logger.info(
      `🚀 Server started on ${getFullServerPath(
        this.config.get('HOST'),
        this.config.get('PORT')
      )}`
    );
  }
}
