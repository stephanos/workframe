import { Component, Inject } from '../../../../';
import { Method, Resource } from '../../../../http';

import AccountsController from '../../controller';
import ChangeEmailProcessor from './processor';


@Component(AccountsController)
class ChangeEmailAddressController {

  @Inject(ChangeEmailProcessor)
  changeEmailProcessor;


  @Resource(Method.PUT, '/changeEmailAddress')
  async changeEmailAddress() {
    // console.log('PUT');
  }
}


export default ChangeEmailAddressController;
