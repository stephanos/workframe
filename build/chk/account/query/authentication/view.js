/* @flow */

import { Record } from '../../../index';

import { Map } from 'immutable';

class AccountAuthenticationView extends Record.Base {
  constructor(init: AccountAuthenticationViewInit) {
    super();
    this.__id = init.id;
    this.__accountId = init.accountId;
    this.__passwordHash = init.passwordHash;
  }

  __id: string;
  __accountId: string;
  __passwordHash: string;

  get id(): string {
    return this.__id;
  }

  get accountId(): string {
    return this.__accountId;
  }

  get passwordHash(): string {
    return this.__passwordHash;
  }

  update(update: AccountAuthenticationViewUpdate): AccountAuthenticationView {
    return new AccountAuthenticationView({
      id: update.id || this.__id,
      accountId: update.accountId || this.__accountId,
      passwordHash: update.passwordHash || this.__passwordHash
    });
  }

  toMap(): Map<string, any> {
    return Map({
      id: this.__id,
      accountId: this.__accountId,
      passwordHash: this.__passwordHash
    });
  }

}

type AccountAuthenticationViewUpdate = { id: ?string;
  accountId: ?string;
  passwordHash: ?string;
};
type AccountAuthenticationViewInit = { id: string;
  accountId: string;
  passwordHash: string;
};
Record('accountAuthentication')(AccountAuthenticationView);
export default AccountAuthenticationView;