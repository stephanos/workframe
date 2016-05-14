/* @flow */
/* eslint-disable */

import { Data } from '../../../../../index';

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

/*::`*/@Data('changeEmail')
/*::`;*/class ChangeEmailCommand extends Data.Base {
  data: Map<string, any>;

  constructor(init: ChangeEmailCommandInit) {
    super();

    if (init) {
      this.data = Map({
        id: init.id,
        aggregateId: init.aggregateId,
        newEmailAddress: init.newEmailAddress
      });
    }
  }

  get id(): string {
    return this.data.get('id');
  }

  get aggregateId(): string {
    return this.data.get('aggregateId');
  }

  get newEmailAddress(): string {
    return this.data.get('newEmailAddress');
  }

  update(update: ChangeEmailCommandUpdate): ChangeEmailCommand {
    const updated = Object.create(ChangeEmailCommand.prototype);
    updated.data = this.data.merge(update);
    return updated;
  }

  toMap(): Map<string, any> {
    return toMap(this.data);
  }

}

type ChangeEmailCommandUpdate = { id?: string;
  aggregateId?: string;
  newEmailAddress?: string;
  [key: string]: void;
};
type ChangeEmailCommandInit = { id: string;
  aggregateId: string;
  newEmailAddress: string;
  [key: string]: void;
};
export default ChangeEmailCommand;