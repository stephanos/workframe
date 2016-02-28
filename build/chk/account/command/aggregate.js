/* @flow */

import { Record } from '../../index';

import { Map } from 'immutable';

class AccountAggregateRoot extends Record.Base {
  constructor(init: AccountAggregateRootInit) {
    super();
    this.__id = init.id;
    this.__emailAddress = init.emailAddress;
  }

  __id: string;
  __emailAddress: string;

  get id(): string {
    return this.__id;
  }

  get emailAddress(): string {
    return this.__emailAddress;
  }

  update(update: AccountAggregateRootUpdate): AccountAggregateRoot {
    return new AccountAggregateRoot({
      id: update.id || this.__id,
      emailAddress: update.emailAddress || this.__emailAddress
    });
  }

  toMap(): Map<string, any> {
    return Map({
      id: this.__id,
      emailAddress: this.__emailAddress
    });
  }

}

type AccountAggregateRootUpdate = { id: ?string;
  emailAddress: ?string;
};
type AccountAggregateRootInit = { id: string;
  emailAddress: string;
};
Record('account')(AccountAggregateRoot);
export default AccountAggregateRoot;