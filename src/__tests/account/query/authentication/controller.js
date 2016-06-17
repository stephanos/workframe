import { Component, Inject } from 'workframe';

import AccountAccessor from './accessor';


@Component()
class AuthenticationController {

  @Inject(AccountAccessor)
  accountAccessor;
}


export default AuthenticationController;
