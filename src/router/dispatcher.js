
class Dispatcher {

  constructor(journal) {
    this.journal = journal;
    // parentId, collector, idGenerator, clock
  //   this.collector = collector;
  //   this.idGenerator = idGenerator;
  //   this.clock = clock;
  //
  //   this.id = idGenerator.next();
  //   this.parentId = parentId;
  //   this.createdAt = clock.now();
  }

  // invoke(module, component, func, args) {
  //   this.trackCall(module, component, func, args);
  //
  //   let result;
  //   try {
  //     const newArgs = args.slice();
  //     newArgs.unshift(this.fork());
  //     result = func.apply(component, newArgs);
  //   } catch (err) {
  //     this.trackError(err);
  //     throw err;
  //   }
  //
  //   this.trackResult(result);
  //   return result;
  // }
  //
  // fork() {
  //   return new Dispatcher(this.id, this.collector, this.idGenerator, this.clock);
  // }
  //
  // trackCall(module, component, func, args) {
  //   this.collector.add({
  //     id: this.id,
  //     parentId: this.parentId,
  //     component: component.constructor.name,
  //     method: func.name,
  //     arguments: args,
  //     time: this.clock.now(),
  //   });
  // }
  //
  // trackError(err) {
  //   this.collector.add({
  //     id: this.id,
  //     error: err,
  //     time: this.clock.now(),
  //   });
  // }
  //
  // trackResult(result) {
  //   this.collector.add({
  //     id: this.id,
  //     result,
  //     time: this.clock.now(),
  //   });
  // }
}


export default Dispatcher;
