import { ApplicationContext } from '../../app';
import { Component, Inject, OnInit } from '../../container';


@Component()
class AggregateFactory {

  @Inject() appContext: ApplicationContext;

  aggregatorByEventType = {};

  @OnInit()
  async init() {
    const aggregatorComponents = this.appContext.getComponentsByType('Aggregator');
    aggregatorComponents.forEach((aggregatorComponent) => {
      const aggregator = this.appContext.createComponent(aggregatorComponent);

      const eventType = aggregatorComponent.parameters[0];
      this.aggregatorByEventType[eventType] = aggregator;
    });
  }

  async create(aggregateStream) {
    const initialAggregate = {};
    const aggregateEvents = aggregateStream.get('events');
    return aggregateEvents.reduce((aggr, evt) => {
      const aggregator = this.aggregatorByEventType[evt];
      return aggregator.aggregate(aggr, evt);
    }, initialAggregate);
  }
}


export default AggregateFactory;
