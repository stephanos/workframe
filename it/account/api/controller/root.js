import { Component, Inject } from 'workframe';
import { CommandRouter } from 'workframe/cqrs';
import { Consumes, Method, Request, Resource, Response } from 'workframe/http';
import BodyParser from 'workframe/http/parser';

import CreateAccountCommand from '../../command/createAccount/command';
// import ChangeEmailAddressCommand from '../../command/changeEmail/command';


@Component()
@Consumes('application/json')
class RootController {

  @Inject(CommandRouter)
  commandRouter;

  @Inject(BodyParser)
  bodyParser;


  @Resource(Method.GET, '/ping/:message')
  async ping(req: Request, res: Response) {
    return `{ pong: ${req.urlParams.message} }`;
  }

  @Resource(Method.POST)
  async create(req: Request, res: Response) {
    const body = await this.bodyParser.parse(req);
    const command = new CreateAccountCommand({
      id: body.id,
      givenName: body.givenName,
      familyName: body.familyName,
      emailAddress: body.emailAddress,
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
