import { Map } from 'immutable';

class EventStore {

  constructor(storage, idGenerator, clock) {
    this.storage = storage;
    this.idGenerator = idGenerator;
    this.clock = clock;
  }

  async addEvents(events) {
    const commitId = this.idGenerator.next();
    const commitStamp = this.clock.now();
    const eventsLen = events.size;

    const uncommittedEvents = events.map((evt, idx) => evt.mergeDeep(Map({
      id: `${ commitId }-${ idx.toString() }`,
      commit: {
        id: commitId,
        timestamp: commitStamp,
        sequence: idx,
        size: eventsLen
      }
    })));

    // TODO: aggregateRevision:
    return this.storage.addEvents(uncommittedEvents);
  }

  async getEventStream(aggregateRef, qryOpts) {
    const events = await this.storage.getEventStream(aggregateRef, qryOpts);
    const aggregateRevision = events.isEmpty() ? -1 : events.last().getIn(['aggregate', 'revision']);
    return Map({
      aggregate: {
        context: aggregateRef.context,
        name: aggregateRef.name,
        id: aggregateRef.id,
        revision: aggregateRevision
      },
      events
    });
  }
}

export default EventStore;