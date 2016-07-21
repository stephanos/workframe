/* @flow */

import { Component } from 'workframe';
import ChangeEmailCommand from './command';
import AccountAggregateRoot from '../aggregate';
import EmailChangedEvent from '../../event/emailChanged';


@Component(ChangeEmailCommand)
class ChangeEmailProcessor {


  async process(aggregate: AccountAggregateRoot,
                command: ChangeEmailCommand): Promise<ChangeEmailCommand> {
    return new EmailChangedEvent({
      aggregateId: aggregate.id,
      newEmailAddress: command.newEmailAddress,
    });
  }
}


export default ChangeEmailProcessor;
