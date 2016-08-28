import { Map, List } from 'immutable';

import { Component, Inject } from '../../container';
import { IdGenerator } from '../../util';
import { Store } from '../store';

import AggregateFactory from './aggregateFactory';


async function getStream(store, aggregateRef) {
  return await store.getEventStream({
    context: aggregateRef.context,
    name: aggregateRef.name,
    id: aggregateRef.id,
  });
}

@Component()
class CommandHandler {

  @Inject() store: Store;
  @Inject() aggregateFactory: AggregateFactory;

  async handle(aggregateRef, processor, command) {
    const aggregateStream = await getStream(this.store, aggregateRef);
    const aggregate = await this.aggregateFactory.create(aggregateStream);
    const processorResult = await processor.process(aggregate, command);
    if (!processorResult) {
      return null; // TODO
    }
    const eventPayloads = List.of(processorResult.toMap()); // TODO: multiple events?
    const events = eventPayloads.map((payload, idx) =>
      Map({
        payload,
        command: {
          name: command.constructor.name, // TODO: use command name from @Component
          id: command.id,
        },
        aggregate: {
          context: aggregateRef.context,
          name: aggregateRef.name,
          id: command.aggregateId || IdGenerator.next(),
          revision: (aggregateStream.aggregateRevision || 0) + idx,
        },
      })
    );

    await this.store.addEvents(events);

    return events;
  }
}


export default CommandHandler;
