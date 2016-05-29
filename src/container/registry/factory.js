import { relations } from '../component2';


class Factory {

  instanceById = {};

  constructor(network) {
    this.network = network;
  }

  create(rootComponent) {
    const resolve = (component) => {
      const instance = this.instanceById[component.id] || new component.factory();
      this.instanceById[component.id] = instance;

      const dependencies = this.network.connectionsFrom(component, relations.DEPENDS) || [];
      dependencies.forEach((dependency) => {
        const property = dependency.props.fieldName;
        const dependencyComponent = dependency.to;
        const dependencyInstance = resolve(dependencyComponent);
        instance[property] = dependencyInstance;
      });

      return instance;
    };

    return resolve(rootComponent);
  }
}


export default Factory;
