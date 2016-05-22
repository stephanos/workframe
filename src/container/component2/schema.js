import { Component } from './decorators';


class Schema {

  constructor(types) {
    this.types = types;
  }

  isComponent(object) {
    const decorators = Reflect.getOwnMetadata('decorator', object);
    if (!decorators) {
      return false;
    }

    const decorator = decorators.find((d) => d.type === Component);
    return decorator !== undefined;
  }

  typeOf(factory) {
    return this.types.find((t) => t.appliesTo(factory));
  }
}


export default Schema;
