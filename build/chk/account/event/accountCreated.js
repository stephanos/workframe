/* @flow */

import { Record } from '../../index';

import { Map } from 'immutable';

class AccountCreatedEvent extends Record.Base {
  constructor(init: AccountCreatedEventInit) {
    super();
    this.__aggregateId = init.aggregateId;
    this.__givenName = init.givenName;
    this.__familyName = init.familyName;
    this.__emailAddress = init.emailAddress;
  }

  __aggregateId: string;

  __givenName: string;
  __familyName: string;
  __emailAddress: string;

  get aggregateId(): string {
    return this.__aggregateId;
  }

  get givenName(): string {
    return this.__givenName;
  }

  get familyName(): string {
    return this.__familyName;
  }

  get emailAddress(): string {
    return this.__emailAddress;
  }

  update(update: AccountCreatedEventUpdate): AccountCreatedEvent {
    return new AccountCreatedEvent({
      aggregateId: update.aggregateId || this.__aggregateId,
      givenName: update.givenName || this.__givenName,
      familyName: update.familyName || this.__familyName,
      emailAddress: update.emailAddress || this.__emailAddress
    });
  }

  toMap(): Map<string, any> {
    return Map({
      aggregateId: this.__aggregateId,
      givenName: this.__givenName,
      familyName: this.__familyName,
      emailAddress: this.__emailAddress
    });
  }

}

type AccountCreatedEventUpdate = { aggregateId: ?string;
  givenName: ?string;
  familyName: ?string;
  emailAddress: ?string;
};
type AccountCreatedEventInit = { aggregateId: string;
  givenName: string;
  familyName: string;
  emailAddress: string;
};
Record('accountCreated')(AccountCreatedEvent);
export default AccountCreatedEvent;