import { Component, Inject } from '../../../../';
import { Method, Resource } from '../../../../http';

import AccountsController from '../../controller';
import ChangeEmailProcessor from './processor';


@Component(AccountsController)
class ChangeEmailAddressController {

  @Inject(ChangeEmailProcessor)
  changeEmailProcessor;


  @Resource('/changeEmailAddress', Method.PUT)
  async changeEmailAddress(req, resp, next) {
    // console.log('PUT');
    await next();
  }
}


export default ChangeEmailAddressController;
