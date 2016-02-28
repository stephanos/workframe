/* @flow */

import { Record } from '../../index';

import { Map } from 'immutable';

class EmailChangedEvent extends Record.Base {
  constructor(init: EmailChangedEventInit) {
    super();
    this.__aggregateId = init.aggregateId;
    this.__newEmailAddress = init.newEmailAddress;
  }

  __aggregateId: string;

  __newEmailAddress: string;

  get aggregateId(): string {
    return this.__aggregateId;
  }

  get newEmailAddress(): string {
    return this.__newEmailAddress;
  }

  update(update: EmailChangedEventUpdate): EmailChangedEvent {
    return new EmailChangedEvent({
      aggregateId: update.aggregateId || this.__aggregateId,
      newEmailAddress: update.newEmailAddress || this.__newEmailAddress
    });
  }

  toMap(): Map<string, any> {
    return Map({
      aggregateId: this.__aggregateId,
      newEmailAddress: this.__newEmailAddress
    });
  }

}

type EmailChangedEventUpdate = { aggregateId: ?string;
  newEmailAddress: ?string;
};
type EmailChangedEventInit = { aggregateId: string;
  newEmailAddress: string;
};
Record('emailChanged')(EmailChangedEvent);
export default EmailChangedEvent;