import { Map, List } from 'immutable';

async function getAggregateStream(store, command) {
  return await store.getEventStream({
    context: command.aggregateContext,
    name: command.aggregateName,
    id: command.aggregateId
  });
}

function buildAggregate(registry, aggregateStream) {
  const initialAggregate = {};
  const aggregateEvents = aggregateStream.get('events');
  return aggregateEvents.reduce((aggr, evt) => {
    const aggregator = registry.getConnection('aggregates', evt.name)[0];
    return aggregator.aggregate(aggr, evt);
  }, initialAggregate);
}

class CommandHandler {

  constructor(store, registry) {
    this.store = store;
    this.registry = registry;
  }

  async handle(processFn, command) {
    const aggregateStream = await getAggregateStream(this.store, command);
    const aggregate = buildAggregate(this.registry, aggregateStream);
    const eventPayload = await processFn(aggregate, command);
    if (!eventPayload) {
      return null; // TODO
    }
    const eventPayloads = List.of(eventPayload.toMap()); // TODO
    const events = eventPayloads.map((payload, idx) => Map({
      command: {
        name: command.constructor.name,
        id: command.id
      },
      // context: TODO,
      payload,
      // name: TOOD,
      // version: TODO,
      aggregate: {
        // context: command.aggregate.context,
        // name: command.aggregate.name,
        // id: command.aggregate.id, //  || eventPayload[0].aggregateId
        revision: (aggregateStream.aggregateRevision || 0) + idx
      }
    }));

    await this.store.addEvents(events);

    return events;
  }
}

export default CommandHandler;