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

/*::`*/@Data('emailChanged')
/*::`;*/class EmailChangedEvent extends Data.Base {
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