import {endsWith} from 'lodash';


function getTypeFor(types, input) {
  for (const type of types) {
    if (endsWith(input.name, type.typeName)) {
      return type;
    }
  }
  throw new Error(`unable to create component: type of '${input.name}' is unknown`);
}

function getIdFor(input, type, validator) {
  const id = input.name.slice(0, -type.typeName.length);
  if (id === '') {
    throw new Error(`unable to create component: missing ID`);
  }
  if (!validator.isValidId(id)) {
    throw new Error(`unable to create component: ID '${id}' has invalid format`);
  }
  return id;
}

function addId(input, id) {
  if (input.id) {
    throw new Error(`unable to create component: property 'id' must not be defined`);
  }
  input.id = id;
}

function addNamespace(input, namespace) {
  if (input.namespace) {
    throw new Error(`unable to create component: property 'namespace' must not be defined`);
  }
  input.namespace = namespace || 'default';
}

function addType(input, type) {
  if (input.type) {
    throw new Error(`unable to create component: property 'type' must not be defined`);
  }
  input.type = type;
}


class ComponentFactory {

  constructor(types, registry, validator) {
    this.types = types;
    this.registry = registry;
    this.validator = validator;
  }

  build(input, namespace) {
    const type = getTypeFor(this.types, input);
    const id = getIdFor(input, type, this.validator);

    addId(input, id);
    addType(input, type.typeName);
    addNamespace(input, namespace);
    input.injectTypeWhitelist = type.injectTypeWhitelist;

    this.registry.add(input);
  }
}


export default ComponentFactory;
