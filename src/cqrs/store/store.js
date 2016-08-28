/* @flow */

import { List, Map } from 'immutable';

import { Storage, StorageFactory } from './storage';

import AggregatorRef from '../aggregatorRef';
import Event from '../event';

import { Clock, IdGenerator } from '../../util';
import { Component, Inject, OnStart } from '../../container';


@Component()
class EventStore {

  @Inject() storageFactory: StorageFactory;

  clock = Clock;
  idGenerator = IdGenerator;
  storage: Storage;

  @OnStart()
  start() {
    this.storage = this.storageFactory.create();
  }

  async addEvents(events: List<Event>): Promise<Map<string, any>> {
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

  async getEventStream(aggregateRef: AggregatorRef): Promise<Map<string, any>> {
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
