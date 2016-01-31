import Collector from './introspection/collector';
import Component from './component/component';


class Dispatcher {

  constructor(registry) {
    this.registry = registry;
  }

  handle(factory, signal) {
    const collector = new Collector();

    const component = new Component(factory);
    const getInstance = () => this.registry.get(component);

    let result;
    const type = component.type.typeName;
    if (type === 'Accessor') {
      result = getInstance().access(this, signal);
    } else if (type === 'Processor') {
      result = getInstance().process(this, signal);
    } else {
      throw new Error(`unable to handle signal: Component must be 'Accessor' or 'Processor' but is '${type}'`);
    }

    return {
      result,
      collector,
    };
  }

  invoke(file, component, func, args) {
    args.unshift(this);
    const result = func.apply(component, args);
    return result;
  }
}


export default Dispatcher;
