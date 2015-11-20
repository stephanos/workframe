class Dispatcher {

  constructor(componentValidator, componentRegistry) {
    this.validator = componentValidator;
    this.registry = componentRegistry;
  }

  handle(Component, signal) {
    if (!this.validator.isComponent(Component)) {
      throw new Error(`unable to handle signal: invalid Component '${Component.name}'`);
    }

    const getInstance = () => this.registry.get(Component.id);
    if (Component.type === 'Accessor') {
      return getInstance().access(signal);
    } else if (Component.type === 'Processor') {
      return getInstance().process(signal);
    }
    throw new Error(`unable to handle signal: Component must be Accessor or Processor but is ${Component.type}`);
  }
}


export default Dispatcher;
