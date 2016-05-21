/* @flow */
/* eslint-disable */

import { Component, Record } from '../../../../../index';

import { Iterable, List, Map } from 'immutable';

function toMap(v) {
  if (v instanceof Iterable) {
    return v.map(toMap);
  }

  if (v instanceof Record.Base) {
    return v.toMap();
  }

  return v;
}

@Record()
@Component('createAccount')
class CreateAccountCommand extends Record.Base {
  data: Map<string, any>;

  constructor(init: CreateAccountCommandInit) {
    super();

    if (init) {
      this.data = Map({
        id: init.id,
        givenName: init.givenName,
        familyName: init.familyName,
        emailAddress: init.emailAddress
      });
    }
  }

  get id(): string {
    return this.data.get('id');
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

  update(update: CreateAccountCommandUpdate): CreateAccountCommand {
    const updated = Object.create(CreateAccountCommand.prototype);
    updated.data = this.data.merge(update);
    return updated;
  }

  toMap(): Map<string, any> {
    return toMap(this.data);
  }

}

type CreateAccountCommandUpdate = { id?: string;
  givenName?: string;
  familyName?: string;
  emailAddress?: string;
  [key: string]: void;
};
type CreateAccountCommandInit = { id: string;
  givenName: string;
  familyName: string;
  emailAddress: string;
  [key: string]: void;
};
export default CreateAccountCommand;