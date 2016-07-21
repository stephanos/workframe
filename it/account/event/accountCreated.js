/*
eslint-disable
*/ /* @flow */

import { Component, Record } from 'workframe';

import { Iterable, List, Map } from 'immutable';

function toMap(v): any {
  if (v instanceof Iterable) {
    return v.map(toMap);
  }

  if (v instanceof Record.Base) {
    return v.toMap();
  }

  return v;
}

@Record()
@Component('accountCreated')
class AccountCreatedEvent extends Record.Base {
  data: Map<string, any>;

  constructor(init: AccountCreatedEventInit) {
    super();

    if (init) {
      this.data = Map({
        aggregateId: init.aggregateId,
        givenName: init.givenName,
        familyName: init.familyName,
        emailAddress: init.emailAddress
      });
    }
  }

  get aggregateId(): string {
    return this.data.get('aggregateId');
  }

  get givenName(): string {
    return this.data.get('givenName');
  }

  get familyName(): string {
    return this.data.get('familyName');
  }

  get emailAddress(): string {
    return this.data.get('emailAddress');
  }

  update(update: AccountCreatedEventUpdate): AccountCreatedEvent {
    const updated = Object.create(AccountCreatedEvent.prototype);
    updated.data = this.data.merge(Map(update));
    return updated;
  }

  toMap(): Map<string, any> {
    return toMap(this.data);
  }

}

type AccountCreatedEventUpdate = {
  aggregateId?: string;
  givenName?: string;
  familyName?: string;
  emailAddress?: string;
  [key: string]: void;
};
type AccountCreatedEventInit = {
  aggregateId: string;
  givenName: string;
  familyName: string;
  emailAddress: string;
  [key: string]: void;
};
export default AccountCreatedEvent;