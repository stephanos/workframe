/* @flow */

import { Record } from '../../../index';

import { Map } from 'immutable';

class ChangeEmailCommand extends Record.Base {
  constructor(init: ChangeEmailCommandInit) {
    super();
    this.__id = init.id;
    this.__aggregateId = init.aggregateId;
    this.__newEmailAddress = init.newEmailAddress;
  }

  __id: string;
  __aggregateId: string;

  __newEmailAddress: string;

  get id(): string {
    return this.__id;
  }

  get aggregateId(): string {
    return this.__aggregateId;
  }

  get newEmailAddress(): string {
    return this.__newEmailAddress;
  }

  update(update: ChangeEmailCommandUpdate): ChangeEmailCommand {
    return new ChangeEmailCommand({
      id: update.id || this.__id,
      aggregateId: update.aggregateId || this.__aggregateId,
      newEmailAddress: update.newEmailAddress || this.__newEmailAddress
    });
  }

  toMap(): Map<string, any> {
    return Map({
      id: this.__id,
      aggregateId: this.__aggregateId,
      newEmailAddress: this.__newEmailAddress
    });
  }

}

type ChangeEmailCommandUpdate = { id: ?string;
  aggregateId: ?string;
  newEmailAddress: ?string;
};
type ChangeEmailCommandInit = { id: string;
  aggregateId: string;
  newEmailAddress: string;
};
Record('changeEmail')(ChangeEmailCommand);
export default ChangeEmailCommand;