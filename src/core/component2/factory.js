import util from 'util';

import Component from './component';


class ComponentFactory {

  constructor(schema, idGenerator) {
    this.schema = schema;
    this.idGenerator = idGenerator;
  }

  create(factory) {
    if (!util.isFunction(factory)) {
      throw new Error(`'${factory}' is not a function`);
    }

    const type = this.schema.typeOf(factory);
    if (!type) {
      throw new Error(`'${factory}' can not be identified as any known component type`);
    }

    const componentId = this.idGenerator.next();
    const connections = []; // TODO
    return new Component(componentId, type, factory, connections);
  }
}


export default ComponentFactory;
