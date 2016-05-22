/* @flow */
/* eslint-disable */

import { Component, Record } from '../';

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
@Component('emailChanged')
class EmailChangedEvent extends Record.Base {
  data: Map<string, any>;

  constructor(init: EmailChangedEventInit) {
    super();

    if (init) {
      this.data = Map({
        aggregateId: init.aggregateId,
        newEmailAddress: init.newEmailAddress
      });
    }
  }

  get aggregateId(): string {
    return this.data.get('aggregateId');
  }

  get newEmailAddress(): string {
    return this.data.get('newEmailAddress');
  }

  update(update: EmailChangedEventUpdate): EmailChangedEvent {
    const updated = Object.create(EmailChangedEvent.prototype);
    updated.data = this.data.merge(update);
    return updated;
  }

  toMap(): Map<string, any> {
    return toMap(this.data);
  }

}

type EmailChangedEventUpdate = { aggregateId?: string;
  newEmailAddress?: string;
  [key: string]: void;
};
type EmailChangedEventInit = { aggregateId: string;
  newEmailAddress: string;
  [key: string]: void;
};
export default EmailChangedEvent;