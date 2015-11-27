import util from 'util';


function proxy(target, idGenerator, collector) {
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
      const id = idGenerator();
      collector.add({
        id: id,
        method: key,
        arguments: args,
      });
      const result = prop.apply(target, args);
      collector.add({
        id: id,
        result: result,
      });
      return result;
    };
  });

  return target;
}


export default proxy;
