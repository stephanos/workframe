import { Component } from 'workframe';

import AccountsController from './controller/root';
import AuthenticationController from './controller/auth';
import ProfileController from './controller/profile';

import ContentFilter from './filter/content';


@Component()
class UrlRouter {

  get routes() {
    return {
      filters: [
        [ContentFilter, { type: 'application/json' }],
      ],

      '/accounts': {
        '/': AccountsController,
        '/authentication': AuthenticationController,
        '/profile': ProfileController,
      },
    };
  }
}


export default UrlRouter;
