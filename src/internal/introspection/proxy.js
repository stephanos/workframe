import util from 'util';


class Proxy {

  constructor(collector, idGenerator, clock) {
    this.collector = collector;
    this.idGenerator = idGenerator;
    this.clock = clock;
  }

  wrap(target) {
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
        const id = this.idGenerator.next();
        this.collector.add({
          id: id,
          method: key,
          arguments: args,
          time: this.clock.now(),
        });
        const result = prop.apply(target, args);
        this.collector.add({
          id: id,
          result: result,
          time: this.clock.now(),
        });
        return result;
      };
    });

    return target;
  }
}


export default Proxy;
