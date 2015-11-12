import {isFunction} from 'lodash';

import createComponent from './factory';


function verifyProcessFunc(input) {
  const processFunc = input.prototype.process;
  if (!isFunction(processFunc)) {
    throw new Error(`method 'process' must be defined`);
  }
  if (processFunc.length !== 1) {
    throw new Error(`method 'process' must have exactly 1 parameter`);
  }
}


function shell(namespace, id) {
  return (target) => {
    verifyProcessFunc(target);
    createComponent(target, {
      namespace: namespace,
      type: 'Shell',
      id: id,
    });
  };
}


export default shell;
