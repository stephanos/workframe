import {isFunction, endsWith} from 'lodash';


function verifyComponentName(target) {
  if (!endsWith(target.name, 'Shell')) {
    throw new Error(`class must have suffix 'Shell'`);
  }
}

function verifyProcessFunc(proto) {
  const processFunc = proto.process;
  if (!isFunction(processFunc)) {
    throw new Error(`method 'process' must be defined`);
  }
  if (processFunc.length !== 1) {
    throw new Error(`method 'process' must have exactly 1 parameter`);
  }
}

function addID(proto, id) {
  if (proto.id) {
    throw new Error(`getter/property 'id' must not be defined`);
  }
  Object.defineProperty(proto, 'id', {
    get: () => id,
  });
}

function addNamespace(proto, namespace) {
  if (proto.namespace) {
    throw new Error(`getter/property 'namespace' must not be defined`);
  }
  Object.defineProperty(proto, 'namespace', {
    get: () => namespace,
  });
}

function addType(proto) {
  if (proto.type) {
    throw new Error(`getter/property 'type' must not be defined`);
  }
  Object.defineProperty(proto, 'type', {
    get: () => 'SHELL',
  });
}


function shell(namespace, id) {
  let componentId;
  let componentNamespace;
  if (id === undefined) {
    componentId = namespace;
    componentNamespace = 'default';
  } else {
    componentId = id;
    componentNamespace = namespace;
  }

  return (target) => {
    const proto = target.prototype;

    // verify
    verifyComponentName(target);
    verifyProcessFunc(proto);

    // modify
    addID(proto, componentId);
    addType(proto);
    addNamespace(proto, componentNamespace);
  };
}


export default shell;
