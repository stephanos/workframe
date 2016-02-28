/* @flow */

import { Component } from '../../../index';
import CreateAccountCommand from './command';
import AccountAggregateRoot from '../aggregate';
import AccountCreatedEvent from '../../event/accountCreated';

class CreateAccountProcessor {

  async process(aggregate: AccountAggregateRoot, command: CreateAccountCommand): Promise<AccountCreatedEvent> {
    // TODO: email already used?
    // TODO: aggregate already exists?

    return new AccountCreatedEvent({
      aggregateId: 'TODO',
      givenName: command.givenName,
      familyName: command.familyName,
      emailAddress: command.emailAddress
    });
  }
}

export default CreateAccountProcessor;