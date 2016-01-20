import clock from './util/clock';
import idGenerator from './util/uuid';

import Proxy from './introspection/proxy';
import Collector from './introspection/collector';
import Component from './component/component';


class Dispatcher {

  constructor(registry) {
    this.registry = registry;
  }

  handle(factory, signal) {
    const collector = new Collector();
    const proxy = new Proxy(collector, idGenerator, clock);

    const component = new Component(factory);
    const getInstance = () => this.registry.get(component, (input) => proxy.wrap(input));

    let result;
    const type = component.type.typeName;
    if (type === 'Accessor') {
      result = getInstance().access(signal);
    } else if (type === 'Processor') {
      result = getInstance().process(signal);
    } else {
      throw new Error(`unable to handle signal: Component must be 'Accessor' or 'Processor' but is '${type}'`);
    }

    return {
      result,
      collector,
    };
  }
}


export default Dispatcher;
