  /* @flow */

import { Component } from 'workframe';

import ChangeEmailCommand from './command';
import AccountAggregate from '../aggregate';
import EmailChangedEvent from '../../event/emailChanged';


@Component(AccountAggregate, ChangeEmailCommand)
class ChangeEmailProcessor {

  async process(aggregate: AccountAggregate,
                command: ChangeEmailCommand): Promise<ChangeEmailCommand> {

    return new EmailChangedEvent({
      aggregateId: aggregate.id,
      newEmailAddress: command.newEmailAddress,
    });
  }
}


export default ChangeEmailProcessor;
