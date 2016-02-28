class Dispatcher {

  constructor(parentId, collector, idGenerator, clock) {
    this.collector = collector;
    this.idGenerator = idGenerator;
    this.clock = clock;

    this.id = idGenerator.next();
    this.parentId = parentId;
    this.createdAt = clock.now();
  }

  invoke(module, component, func, args) {
    this._trackCall(module, component, func, args);

    let result;
    try {
      const newArgs = args.slice();
      newArgs.unshift(this._fork());
      result = func.apply(component, newArgs);
    } catch (err) {
      this._trackError(err);
      throw err;
    }

    this._trackResult(result);
    return result;
  }

  _trackCall(module, component, func, args) {
    this.collector.add({
      id: this.id,
      parentId: this.parentId,
      component: component.constructor.name,
      method: func.name,
      arguments: args,
      time: this.clock.now()
    });
  }

  _trackError(err) {
    this.collector.add({
      id: this.id,
      error: err,
      time: this.clock.now()
    });
  }

  _trackResult(result) {
    this.collector.add({
      id: this.id,
      result,
      time: this.clock.now()
    });
  }

  _fork() {
    return new Dispatcher(this.id, this.collector, this.idGenerator, this.clock);
  }
}

export default Dispatcher;