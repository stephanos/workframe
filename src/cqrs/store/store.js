/* @flow */

import { List, Map } from 'immutable';

import { Storage } from './storage';

import Event from '../event';
import AggregatorRef from '../aggregatorRef';
import { IdGenerator, Clock } from '../../util';


class EventStore {

  storage: Storage;
  idGenerator: IdGenerator;
  clock: Clock;

  constructor(storage: Storage, idGenerator: IdGenerator, clock: Clock) {
    this.storage = storage;
    this.idGenerator = idGenerator;
    this.clock = clock;
  }

  async addEvents(events: List<Event>) {
    const commitId = this.idGenerator.next();
    const commitStamp = this.clock.now();
    const eventsLen = events.size;

    const uncommittedEvents = events.map((evt, idx) => {
      const copy = Object.assign({}, evt);
      copy.id = `${commitId}-${idx.toString()}`;
      copy.commit = {
        id: commitId,
        timestamp: commitStamp,
        sequence: idx,
        size: eventsLen,
      };
      // TODO: aggregateRevision:
      return copy;
    });

    return await this.storage.addEvents(uncommittedEvents);
  }

  async getEventStream(aggregateRef: AggregatorRef) {
    const events = await this.storage.getEventStream(aggregateRef);
    const aggregateRevision = events.isEmpty() ? -1 : events.last().getIn(['aggregate', 'revision']);
    return Map({
      aggregate: {
        context: aggregateRef.context,
        name: aggregateRef.name,
        id: aggregateRef.id,
        revision: aggregateRevision,
      },
      events,
    });
  }
}


export default EventStore;
