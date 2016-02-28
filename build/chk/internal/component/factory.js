import { endsWith } from 'lodash';

import { CreateComponentError } from './errors';
import Component from './component';

function getTypeFor(input, types) {
  const inputName = input.name;
  for (const type of types) {
    if (endsWith(inputName, type.typeName)) {
      return type;
    }
  }
  throw new CreateComponentError(`'${ inputName }' is not a known type`);
}

function getNameFor(input, type) {
  return input.name.slice(0, -type.typeName.length);
}

class ComponentFactory {

  _componentsSortedByCreation = [];

  constructor(types, registry, validator) {
    this.types = types;
    this.registry = registry;
    this.validator = validator;
  }

  build(input, opts) {
    const component = new Component(input);
    this._componentsSortedByCreation.push(component);

    component.opts = opts;

    component.type = getTypeFor(input, this.types);
    component.type.verify(input);
    if (component.type.addRelation) {
      component.type.addRelation(this.registry, input, opts);
    }

    component.name = getNameFor(input, component.type);
    this.validator.validateName(input, component.name);

    this.validator.validateDependencies(input, component.type, component.dependencies);

    this.registry.add(component);

    return component;
  }

  get componentsSortedByCreation() {
    return this._componentsSortedByCreation;
  }
}

export default ComponentFactory;