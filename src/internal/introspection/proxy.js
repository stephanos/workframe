/* @flow */

import util from 'util';

import Collector from './collector';


function proxy(target: Object, collector: Collector): Object {
  const proto = Object.getPrototypeOf(target);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key === 'constructor') {
      return;
    }

    const prop = target[key];
    if (!util.isFunction(prop)) {
      return;
    }

    target[key] = (...args) => {
      collector.add({
        method: key,
        arguments: args,
      });
      return prop.apply(target, args);
    };
  });

  return target;
}


export default proxy;
