import Component from './component/component';


class Dispatcher {

  constructor(componentRegistry) {
    this.registry = componentRegistry;
  }

  handle(factory, signal) {
    const component = new Component(factory);
    const getInstance = () => this.registry.get(component);

    const type = component.type.typeName;
    if (type === 'Accessor') {
      return getInstance().access(signal);
    } else if (type === 'Processor') {
      return getInstance().process(signal);
    }
    throw new Error(`unable to handle signal: Component must be 'Accessor' or 'Processor' but is '${type}'`);
  }
}


export default Dispatcher;
