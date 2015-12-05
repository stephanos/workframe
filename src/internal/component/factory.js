import {endsWith} from 'lodash';

import {CreateComponentError} from './errors';
import Component from './component';


function getTypeFor(input, types) {
  for (const type of types) {
    if (endsWith(input.name, type.typeName)) {
      return type;
    }
  }
  throw new CreateComponentError(`not a known type`);
}


function getNameFor(input, type) {
  return input.name.slice(0, -type.typeName.length);
}


class ComponentFactory {

  constructor(types, registry, validator) {
    this.types = types;
    this.registry = registry;
    this.validator = validator;
  }

  build(input, namespace) {
    const component = new Component(input);

    component.type = getTypeFor(input, this.types);
    component.type.verify(input);

    component.name = getNameFor(input, component.type);
    this.validator.validateName(input, component.name);

    component.namespace = namespace || 'default';
    this.validator.validateNamespace(input, component.namespace);

    this.validator.validateDependencies(input, component.type, component.dependencies);

    this.registry.add(component);

    return component;
  }
}


export default ComponentFactory;
