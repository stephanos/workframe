
class Dispatcher {

  constructor(parentId, journal, idGenerator, clock) {
    this.parentId = parentId;
    this.journal = journal;
    this.idGenerator = idGenerator;
    this.clock = clock;

    this.id = idGenerator.next();
    this.createdAt = clock.now();
  }


  fork() {
    return new Dispatcher(this.id, this.journal, this.idGenerator, this.clock);
  }

  invoke(module, component, func, args) {
    this.trackCall(module, component, func, args);

    let result;
    try {
      const newArgs = args.slice();
      newArgs.unshift(this.fork());
      result = func.apply(component, newArgs);
    } catch (err) {
      this.trackError(err);
      throw err;
    }

    this.trackResult(result);
    return result;
  }

  trackCall(module, component, func, args) {
    this.journal.add({
      id: this.id,
      parentId: this.parentId,
      component: component.constructor.name,
      method: func.name,
      arguments: args,
      time: this.clock.now(),
    });
  }

  trackError(err) {
    this.journal.add({
      id: this.id,
      error: err,
      time: this.clock.now(),
    });
  }

  trackResult(result) {
    this.journal.add({
      id: this.id,
      result,
      time: this.clock.now(),
    });
  }
}


export default Dispatcher;
