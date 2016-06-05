import Component from './decorator';


class Schema {

  constructor(types, identifier) {
    this.types = types;
    this.identifier = identifier;
  }

  isComponent(object) {
    if (object !== Object(object)) {
      return false;
    }

    const decorators = Reflect.getOwnMetadata('decorator', object);
    if (!decorators) {
      return false;
    }

    const decorator = decorators.find((d) => d.type === Component);
    return decorator !== undefined;
  }

  typeOf(input) {
    return this.types.find((t) => this.identifier.test(t, input));
  }
}


export default Schema;
