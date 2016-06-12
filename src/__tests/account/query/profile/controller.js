import { Component, Inject } from '../../../../';
import { Method, Resource } from '../../../../http';

import AccountsController from '../../controller';
import AccountAccessor from '../authentication/accessor';


@Component(AccountsController, '/profile')
class AuthentictionController {

  @Inject(AccountAccessor)
  accountAccessor;


  @Resource(Method.GET, '/')
  async getAccount() {
    // console.log('GET');
  }
}


export default AuthentictionController;
