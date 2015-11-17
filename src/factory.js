import {endsWith} from 'lodash';


function verifyId(validator, id) {
  if (!validator.isValidId(id)) {
    throw new Error(`unable to create component: ID '${id}' has invalid format`);
  }
}

function verifyName(input, type) {
  if (!endsWith(input.name, type)) {
    throw new Error(`unable to create component: '${input.name}' must have suffix '${type}'`);
  }
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
  input.namespace = namespace;
}

function addType(input, type) {
  if (input.type) {
    throw new Error(`unable to create component: property 'type' must not be defined`);
  }
  input.type = type;
}


class ComponentFactory {

  constructor(registry, validator) {
    this.registry = registry;
    this.validator = validator;
  }

  build(input, settings) {
    const {namespace, id, type, injectTypeWhitelist} = settings;

    let componentId;
    let componentNamespace;
    if (id === undefined) {
      componentId = namespace;
      componentNamespace = 'default';
    } else {
      componentId = id;
      componentNamespace = namespace;
    }

    verifyName(input, type);
    verifyId(this.validator, id);

    addId(input, componentId);
    addType(input, type);
    addNamespace(input, componentNamespace);
    input.injectTypeWhitelist = injectTypeWhitelist;

    this.registry.add(input);
  }
}


export default ComponentFactory;
