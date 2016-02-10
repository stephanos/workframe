import Collector from './introspection/collector';
import Component from './component/component';
import Dispatcher from './dispatcher';

import clock from './util/clock';
import idGenerator from './util/uuid';


class Result {

  constructor(result, collector) {
    this.result = result;
    this.collector = collector;
  }
}


class Router {

  constructor(registry) {
    this.registry = registry;
  }

  invoke(component, fn, args) {
    const collector = new Collector();
    const dispatcher = new Dispatcher(null, collector, idGenerator, clock);
    const instance = this.registry.get(component);
    args.unshift(dispatcher);
    const result = instance[fn].apply(instance, args);
    return new Result(result, collector);
  }

  handle(factory, signal) {
    const component = new Component(factory);
    const type = component.type.typeName;
    if (type === 'Accessor') {
      return this.invoke(component, 'access', [signal]);
    } else if (type === 'Processor') {
      return this.invoke(component, 'process', [signal]);
    }

    throw new Error(`unable to handle signal: Component must be 'Accessor' or 'Processor' but is '${type}'`);
  }
}


export default Router;
