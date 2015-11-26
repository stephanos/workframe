import {endsWith} from 'lodash';


function getTypeFor(types, input) {
  for (const type of types) {
    if (endsWith(input.name, type.typeName)) {
      return type;
    }
  }
  throw new Error(`unable to create component: type of '${input.name}' is unknown`);
}

function getNameFor(input, type, validator) {
  const name = input.name.slice(0, -type.typeName.length);
  if (name === '') {
    throw new Error(`unable to create component: missing name`);
  }
  if (!validator.isValidName(name)) {
    throw new Error(`unable to create component: name '${name}' has invalid format`);
  }
  return name;
}

function addName(input, name) {
  if (input._name) {
    throw new Error(`unable to create component: property '_name' must not be defined`);
  }
  input._name = name;
}

function addNamespace(input, namespace) {
  if (input._namespace) {
    throw new Error(`unable to create component: property '_namespace' must not be defined`);
  }
  input._namespace = namespace || 'default';
}

function addInjectTypeWhitelist(input, whitelist) {
  if (input._injectTypeWhitelist) {
    throw new Error(`unable to create component: property '_injectTypeWhitelist' must not be defined`);
  }
  input._injectTypeWhitelist = whitelist.slice();
}

function addType(input, type) {
  if (input._type) {
    throw new Error(`unable to create component: property '_type' must not be defined`);
  }
  input._type = type;
}


class ComponentFactory {

  constructor(types, registry, validator) {
    this.types = types;
    this.registry = registry;
    this.validator = validator;
  }

  build(input, namespace) {
    const type = getTypeFor(this.types, input);
    type.verify(input);
    const name = getNameFor(input, type, this.validator);

    addName(input, name);
    addType(input, type.typeName);
    addNamespace(input, namespace);
    addInjectTypeWhitelist(input, type.injectTypeWhitelist);

    this.registry.add(input, {
      isSingleton: type.isSingleton,
      dependencies: input._dependencies,
      namespace: namespace,
      name: name,
      type: type,
    });
  }
}


export default ComponentFactory;
