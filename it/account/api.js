import { Component, Inject } from '../../src';
import { Method, Resource } from '../../src/http';

import AccountAccessor from './read/accountAccessor';
import ChangeEmailProcessor from './write/changeEmailProcessor';


@Component('/accounts')
class AccountController {

  @Inject(AccountAccessor)
  accountAccessor;

  @Inject(ChangeEmailProcessor)
  changeEmailProcessor;


  @Resource('/', Method.GET)
  async getAccount(req, resp, next) {
    // console.log('GET');
    await next();
  }

  @Resource('/changeEmailAddress', Method.PUT)
  async changeEmailAddress(req, resp, next) {
    // console.log('PUT');
    await next();
  }
}


export default AccountController;
