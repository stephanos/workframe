import {isFunction} from 'lodash';

import createComponent from './factory';


function verifyProcessFunc(input) {
  const processFunc = input.prototype.process;
  if (!isFunction(processFunc)) {
    throw new Error(`method 'process' must be defined`);
  }
}

function behavior(namespace, id) {
  return (target) => {
    verifyProcessFunc(target);
    createComponent(target, {
      injectTypeWhitelist: [],
      namespace: namespace,
      type: 'Behavior',
      id: id,
    });
  };
}


export default behavior;
