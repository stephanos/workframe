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

  handle(factory, signal) {
    const collector = new Collector();
    const getDispatcher = () => new Dispatcher(null, collector, idGenerator, clock);

    const component = new Component(factory);
    const getInstance = () => this.registry.get(component);

    let result;
    const type = component.type.typeName;
    if (type === 'Accessor') {
      result = getInstance().access(getDispatcher(), signal);
    } else if (type === 'Processor') {
      result = getInstance().process(getDispatcher(), signal);
    } else {
      throw new Error(`unable to handle signal: Component must be 'Accessor' or 'Processor' but is '${type}'`);
    }

    return new Result(result, collector);
  }
}


export default Router;
