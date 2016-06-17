import { Component } from 'workframe';

import AccountsController from './controller/root';
import AuthenticationController from './controller/auth';
import ProfileController from './controller/profile';


@Component()
class UrlRouter {

  routes() {
    return {
      // TODO: LoginUserFilter,

      '/accounts': {
        controller: AccountsController,

        '/authentication': AuthenticationController,
        '/profile': ProfileController,
      },
    };
  }
}


export default UrlRouter;
