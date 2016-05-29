import util from 'util';

import Component from './component';
import relations from './relations';
import { Inject } from './decorators';


function findConnections(type, factory) {
  const connections = [];

  const allDecorated = Reflect.getMetadata('decorated', factory);
  if (allDecorated) {
    allDecorated
      .filter((decorated) => decorated.kind === 'field')
      .forEach((decorated) => {
        Reflect.getMetadata('decorator', factory, decorated.name)
          .filter((decorator) => decorator.type === Inject)
          .forEach((decorator) => {
            const dependency = decorator.parameters[0];
            if (!dependency) {
              throw new Error(`@Inject in ${factory.name} is missing its dependency reference`);
            }
            connections.push({
              from: factory,
              to: dependency,
              relation: relations.DEPENDS,
            });
          });
      });
  }

  return connections;
}


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
      throw new Error(`'${factory.name}' can not be identified as any known component type`);
    }

    const componentId = this.idGenerator.next();
    const connections = findConnections(type, factory);
    return new Component(componentId, type, factory, connections);
  }
}


export default ComponentFactory;
