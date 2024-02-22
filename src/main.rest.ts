import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './types/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './modules/user/index.js';
import { createCommentContainer } from './modules/comment/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createCommentContainer()
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}
bootstrap();
