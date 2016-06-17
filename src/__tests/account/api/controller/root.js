import { Component } from 'workframe';
import { Method, Request, Resource, Response } from 'workframe/http';


@Component()
class AccountsController {

  @Resource(Method.GET, '/ping/:message')
  async ping(req: Request, res: Response) {
    res
      .setHeader('Content-Type', 'application/json')
      .write(`{ pong: ${req.urlParams.message} }`);
  }
}


export default AccountsController;
