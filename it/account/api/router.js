import { Component } from 'workframe';

import RootController from './controller/root';
import ContentFilter from './filter/content';


@Component()
class UrlRouter {

  get routes() {
    return {
      filters: [
        [ContentFilter, { type: 'application/json' }],
      ],

      '/accounts': {
        '/': RootController,
      },
    };
  }
}


export default UrlRouter;
