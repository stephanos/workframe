import util from 'util';

import Component from './component';
import ComponentDecorator from './decorator';


function findDecorations(type, factory) {
  return (Reflect.getMetadata('decorated', factory) || [])
    .reduce(((acc, decorated) =>
      acc.concat(Reflect.getMetadata('decorator', factory, decorated.name)
        .map((decorator) =>
          Object.assign(
            {},
            decorator,
            { target: decorated },
          )
        ))
      ), []
    );
}

function findParameters(factory) {
  const decorators = Reflect.getMetadata('decorator', factory) || [];
  const decorator = decorators.find((d) => d.type === ComponentDecorator);
  if (decorator) {
    return decorator.parameters;
  }
  return [];
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
    const parameters = findParameters(factory);
    const decorations = findDecorations(type, factory);
    return new Component(componentId, type, factory, parameters, decorations);
  }
}


export default ComponentFactory;
