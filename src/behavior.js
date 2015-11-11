import {isFunction} from 'lodash';

import ComponentUtil from './component';


function verifyProcessFunc(input) {
  const processFunc = input.prototype.process;
  if (!isFunction(processFunc)) {
    throw new Error(`method 'process' must be defined`);
  }
}

function behavior(namespace, id) {
  return (target) => {
    verifyProcessFunc(target);
    ComponentUtil.create(target, namespace, id, 'Behavior');
  };
}


export default behavior;
