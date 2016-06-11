import { Component } from '../../';
import { Method, Resource } from '../../http';


@Component('/accounts')
class AccountsController {

  @Resource('/hello', Method.GET)
  async getAccount(req, resp, next) {
    resp.write('Hi');
    await next();
  }
}


export default AccountsController;
