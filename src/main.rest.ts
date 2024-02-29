import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './types/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './modules/user/index.js';
import { createCommentContainer } from './modules/comment/index.js';
import { createOfferContainer } from './modules/offer/index.js';
import { createAuthContainer } from './modules/auth/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createAuthContainer()
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}
bootstrap();
