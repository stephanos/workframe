import relations from './relations';


class Factory {

  instanceByType = {};

  constructor(network, parent) {
    this.network = network;
    this.parent = parent;
  }

  create(rootType) {
    const resolve = (type) => {
      if (!this.network.contains(type)) {
        if (this.parent) {
          return this.parent.create(type);
        }
        throw new Error(`unable to resolve type '${type.name ? type.name : type}'`);
      }

      const cachedInstance = this.instanceByType[type];
      if (cachedInstance) {
        return cachedInstance;
      }

      const newInstance = new type();
      const dependencies = this.network.connectionsFrom(type, relations.DEPENDS) || [];
      dependencies.forEach((dependency) => {
        const property = dependency.props.fieldName;
        const dependencyComponent = dependency.to;
        const dependencyInstance = resolve(dependencyComponent);
        newInstance[property] = dependencyInstance;
      });

      this.instanceByType[type] = newInstance;
      return newInstance;
    };

    return resolve(rootType);
  }
}


export default Factory;
