import { OnInit, OnStart, OnStop } from '../lifecycle/decorators';


function findMethodsWithDecorator(component, decoratorType) {
  return component.decorations
    .filter((decoration) => decoration.type === decoratorType)
    .filter((decoration) => decoration.target.kind === 'method')
    .map((decoration) => decoration.target.name);
}


class Transitioner {

  constructor(network, factory) {
    this.network = network;
    this.factory = factory;
  }

  async init(dispatcher) {
    await this.transitionTo(dispatcher, OnInit, 'connectionsFrom', 'to');
  }

  async start(dispatcher) {
    await this.transitionTo(dispatcher, OnStart, 'connectionsFrom', 'to');
  }

  async stop(dispatcher) {
    await this.transitionTo(dispatcher, OnStop, 'connectionsTo', 'from');
  }

  async transitionTo(dispatcher, transitionDecorator, connectionFn, dir) {
    const transitioning = [];

    const transition = async (componentFactories) => {
      if (componentFactories.length === 0) {
        return;
      }

      const transitionLater = [];

      componentFactories.forEach((componentFactory) => {
        const dependencies = this.network[connectionFn](componentFactory);
        const hasUntransitionedDependency = dependencies.find((dep) => componentFactories.indexOf(dep[dir]) >= 0);
        if (hasUntransitionedDependency) {
          transitionLater.push(componentFactory);
          return;
        }

        const { component } = this.network.propsByValue[componentFactory];
        findMethodsWithDecorator(component, transitionDecorator)
          .forEach((transitionMethod) => {
            const instance = this.factory.create(componentFactory);
            transitioning.push(instance[transitionMethod](dispatcher));
          });
      });

      await transition(transitionLater);
    };

    await transition(this.network.nodes);

    await Promise.all(transitioning);
  }
}


export default Transitioner;
