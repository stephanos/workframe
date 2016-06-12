import { Component } from '../../';
import { Method, Resource } from '../../http';


@Component('/accounts')
class AccountsController {

  @Resource(Method.GET, '/hello/:who')
  async getAccount(request, response) {
    response.write(`Hi ${request.urlParams.who}`);
  }
}


export default AccountsController;
