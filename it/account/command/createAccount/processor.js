/* @flow */

import { Component } from 'workframe';

import CreateAccountCommand from './command';
import AccountAggregate from '../aggregate';
import AccountCreatedEvent from '../../event/accountCreated';


@Component(AccountAggregate, CreateAccountCommand)
class CreateAccountProcessor {

  async process(aggregate: AccountAggregate,
                command: CreateAccountCommand): Promise<AccountCreatedEvent> {
    // TODO: email already used?

    return new AccountCreatedEvent({
      givenName: command.givenName,
      familyName: command.familyName,
      emailAddress: command.emailAddress,
    });
  }
}


export default CreateAccountProcessor;
