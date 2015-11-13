import {endsWith} from 'lodash';

import Registry from './registry';


const registry = new Registry();


function verifyName(input, type) {
  if (!endsWith(input.name, type)) {
    throw new Error(`class must have suffix '${type}'`);
  }
}

function addId(input, id) {
  if (input.id) {
    throw new Error(`getter/property 'id' must not be defined`);
  }
  input.id = id;
}

function addNamespace(input, namespace) {
  if (input.namespace) {
    throw new Error(`getter/property 'namespace' must not be defined`);
  }
  input.namespace = namespace;
}

function addType(input, type) {
  if (input.type) {
    throw new Error(`getter/property 'type' must not be defined`);
  }
  input.type = type;
}


export default function create(input, settings) {
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

  addId(input, componentId);
  addType(input, type);
  addNamespace(input, componentNamespace);
  input.injectTypeWhitelist = injectTypeWhitelist;

  registry.add(input);
}
