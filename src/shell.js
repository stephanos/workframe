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
    throw new Error(`getter 'id' must not be defined`);
  }
  Object.defineProperty(proto, 'id', {
    get: () => id,
  });
}

function addTypeFunc(proto) {
  if (proto.type) {
    throw new Error(`getter 'type' must not be defined`);
  }
  Object.defineProperty(proto, 'type', {
    get: () => 'SHELL',
  });
}


function shell(id, target) {
  const proto = target.prototype;
  // console.log(Reflect.ownKeys(proto));

  // verify
  verifyComponentName(target);
  verifyProcessFunc(proto);

  // modify
  addID(proto, id);
  addTypeFunc(proto);
}


export default shell;
