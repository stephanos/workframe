class Schema {

  constructor(types, decorator) {
    this.types = types;
    this.decorator = decorator;
  }

  isComponent(object) {
    const decorators = Reflect.getOwnMetadata('decorator', object);
    if (!decorators) {
      return false;
    }

    const decorator = decorators.find((d) => d.type === this.decorator);
    return decorator !== undefined;
  }

  typeOf(factory) {
    return this.schema.types.find((t) => t.appliesTo(factory));
  }
}


export default Schema;
