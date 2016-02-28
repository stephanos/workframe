/* @flow */

import { Record } from '../../../index';

import { Map } from 'immutable';

class CreateAccountCommand extends Record.Base {
  constructor(init: CreateAccountCommandInit) {
    super();
    this.__id = init.id;
    this.__givenName = init.givenName;
    this.__familyName = init.familyName;
    this.__emailAddress = init.emailAddress;
  }

  __id: string;
  __givenName: string;
  __familyName: string;
  __emailAddress: string;

  get id(): string {
    return this.__id;
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

  update(update: CreateAccountCommandUpdate): CreateAccountCommand {
    return new CreateAccountCommand({
      id: update.id || this.__id,
      givenName: update.givenName || this.__givenName,
      familyName: update.familyName || this.__familyName,
      emailAddress: update.emailAddress || this.__emailAddress
    });
  }

  toMap(): Map<string, any> {
    return Map({
      id: this.__id,
      givenName: this.__givenName,
      familyName: this.__familyName,
      emailAddress: this.__emailAddress
    });
  }

}

type CreateAccountCommandUpdate = { id: ?string;
  givenName: ?string;
  familyName: ?string;
  emailAddress: ?string;
};
type CreateAccountCommandInit = { id: string;
  givenName: string;
  familyName: string;
  emailAddress: string;
};
Record('createAccount')(CreateAccountCommand);
export default CreateAccountCommand;