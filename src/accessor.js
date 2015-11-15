import {isFunction} from 'lodash';

import createComponent from './factory';


function verifyAccessorFunc(input) {
  const accessFunc = input.prototype.access;
  if (!isFunction(accessFunc)) {
    throw new Error(`method 'access' must be defined`);
  }
  if (accessFunc.length !== 1) {
    throw new Error(`method 'access' must have exactly 1 parameter`);
  }
}


function accessor(namespace, id) {
  return (target) => {
    verifyAccessorFunc(target);
    createComponent(target, {
      injectTypeWhitelist: ['Accessor', 'Behavior', 'Command', 'Query'],
      namespace: namespace,
      type: 'Accessor',
      id: id,
    });
  };
}


export default accessor;
