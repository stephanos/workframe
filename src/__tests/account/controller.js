import { Component } from 'workframe';
import { Method, Resource } from 'workframe/http';


@Component()
class AccountsController {

  @Resource(Method.GET, '/hello/:who')
  async getAccount(request, response) {
    response
      .setHeader('Content-Type', 'application/json')
      .write(`{ Hi: ${request.urlParams.who} }`);
  }
}


export default AccountsController;
