import {isFunction} from 'lodash';


function proxy(target) {
  target.calls = [];

  const proto = Object.getPrototypeOf(target);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key === 'constructor') {
      return;
    }

    const prop = target[key];
    if (!isFunction(prop)) {
      return;
    }

    target[key] = (...args) => {
      target.calls.push({
        method: key,
        arguments: args,
      });
      return prop.apply(target, args);
    };
  });
  return target;
}


export default proxy;
