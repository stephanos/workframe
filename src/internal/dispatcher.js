class Dispatcher {

  constructor(componentRegistry, componentValidator) {
    this.registry = componentRegistry;
    this.validator = componentValidator;
  }

  handle(Component, signal) {
    if (!this.validator.isComponent(Component)) {
      throw new Error(`unable to handle signal: invalid Component '${Component.name}'`);
    }

    const getInstance = () => this.registry.get({
      namespace: Component._namespace,
      name: Component._name,
      type: Component._type,
    });

    if (Component._type === 'Accessor') {
      return getInstance().access(signal);
    } else if (Component._type === 'Processor') {
      return getInstance().process(signal);
    }
    throw new Error(`unable to handle signal: Component must be Accessor or Processor but is ${Component._type}`);
  }
}


export default Dispatcher;
