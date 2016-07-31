import { Component, Inject } from 'workframe';
import { CommandRouter } from 'workframe/cqrs';
import { Method, Request, Resource, Response } from 'workframe/http';

import CreateAccountCommand from '../../command/createAccount/command';
// import ChangeEmailAddressCommand from '../../command/changeEmail/command';


@Component()
class RootController {

  @Inject(CommandRouter)
  commandRouter;


  @Resource(Method.GET, '/ping/:message')
  async ping(req: Request, res: Response) {
    return `{ pong: ${req.urlParams.message} }`;
  }

  @Resource(Method.POST)
  async create(req: Request, res: Response) {
    const command = new CreateAccountCommand({
      // id: req.body.id,
      // givenName: req.body.givenName,
      // familyName: req.body.familyName,
      // emailAddress: req.body.emailAddress,
    });
    await this.commandRouter.process(command);
  }

  // @Resource(Method.GET, '/:id')
  // async create(req: Request, res: Response) {
  //   res.status = 200;
  //   // TODO
  // }

  // @Resource(Method.PUT, '/:id/email')
  // async changeEmail(req: Request, res: Response) {
  //   const command = new ChangeEmailAddressCommand({
  //     id: 'test',
  //     aggregateId: 'test',
  //     newEmailAddress: 'test',
  //   });
  //   await this.commandRouter.process(command);
  // }
}


export default RootController;
