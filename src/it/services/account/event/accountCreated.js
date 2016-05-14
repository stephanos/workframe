/* @flow */
/* eslint-disable */

import { Data } from '../../../../index';

import { Iterable, List, Map } from 'immutable';

function toMap(v) {
  if (v instanceof Iterable) {
    return v.map(toMap);
  }

  if (v instanceof Data.Base) {
    return v.toMap();
  }

  return v;
}

/*::`*/@Data('accountCreated')
/*::`;*/class AccountCreatedEvent extends Data.Base {
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
    updated.data = this.data.merge(update);
    return updated;
  }

  toMap(): Map<string, any> {
    return toMap(this.data);
  }

}

type AccountCreatedEventUpdate = { aggregateId?: string;
  givenName?: string;
  familyName?: string;
  emailAddress?: string;
  [key: string]: void;
};
type AccountCreatedEventInit = { aggregateId: string;
  givenName: string;
  familyName: string;
  emailAddress: string;
  [key: string]: void;
};
export default AccountCreatedEvent;