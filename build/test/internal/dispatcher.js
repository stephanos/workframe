"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
let Dispatcher = class Dispatcher {

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
};
exports.default = Dispatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2Rpc3BhdGNoZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFBTSxhQUFOLE1BQU0sVUFBTixDQUFpQjs7QUFFZixjQUFZLFFBQVosRUFBc0IsU0FBdEIsRUFBaUMsV0FBakMsRUFBOEMsS0FBOUMsRUFBcUQ7QUFDbkQsU0FBSyxTQUFMLEdBQWlCLFNBQWpCLENBRG1EO0FBRW5ELFNBQUssV0FBTCxHQUFtQixXQUFuQixDQUZtRDtBQUduRCxTQUFLLEtBQUwsR0FBYSxLQUFiLENBSG1EOztBQUtuRCxTQUFLLEVBQUwsR0FBVSxZQUFZLElBQVosRUFBVixDQUxtRDtBQU1uRCxTQUFLLFFBQUwsR0FBZ0IsUUFBaEIsQ0FObUQ7QUFPbkQsU0FBSyxTQUFMLEdBQWlCLE1BQU0sR0FBTixFQUFqQixDQVBtRDtHQUFyRDs7QUFXQSxTQUFPLE1BQVAsRUFBZSxTQUFmLEVBQTBCLElBQTFCLEVBQWdDLElBQWhDLEVBQXNDO0FBQ3BDLFNBQUssVUFBTCxDQUFnQixNQUFoQixFQUF3QixTQUF4QixFQUFtQyxJQUFuQyxFQUF5QyxJQUF6QyxFQURvQzs7QUFHcEMsUUFBSSxNQUFKLENBSG9DO0FBSXBDLFFBQUk7QUFDRixZQUFNLFVBQVUsS0FBSyxLQUFMLEVBQVYsQ0FESjtBQUVGLGNBQVEsT0FBUixDQUFnQixLQUFLLEtBQUwsRUFBaEIsRUFGRTtBQUdGLGVBQVMsS0FBSyxLQUFMLENBQVcsU0FBWCxFQUFzQixPQUF0QixDQUFULENBSEU7S0FBSixDQUlFLE9BQU8sR0FBUCxFQUFZO0FBQ1osV0FBSyxXQUFMLENBQWlCLEdBQWpCLEVBRFk7QUFFWixZQUFNLEdBQU4sQ0FGWTtLQUFaOztBQUtGLFNBQUssWUFBTCxDQUFrQixNQUFsQixFQWJvQztBQWNwQyxXQUFPLE1BQVAsQ0Fkb0M7R0FBdEM7O0FBa0JBLGFBQVcsTUFBWCxFQUFtQixTQUFuQixFQUE4QixJQUE5QixFQUFvQyxJQUFwQyxFQUEwQztBQUN4QyxTQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CO0FBQ2pCLFVBQUksS0FBSyxFQUFMO0FBQ0osZ0JBQVUsS0FBSyxRQUFMO0FBQ1YsaUJBQVcsVUFBVSxXQUFWLENBQXNCLElBQXRCO0FBQ1gsY0FBUSxLQUFLLElBQUw7QUFDUixpQkFBVyxJQUFYO0FBQ0EsWUFBTSxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQU47S0FORixFQUR3QztHQUExQzs7QUFXQSxjQUFZLEdBQVosRUFBaUI7QUFDZixTQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CO0FBQ2pCLFVBQUksS0FBSyxFQUFMO0FBQ0osYUFBTyxHQUFQO0FBQ0EsWUFBTSxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQU47S0FIRixFQURlO0dBQWpCOztBQVFBLGVBQWEsTUFBYixFQUFxQjtBQUNuQixTQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CO0FBQ2pCLFVBQUksS0FBSyxFQUFMO0FBQ0osWUFGaUI7QUFHakIsWUFBTSxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQU47S0FIRixFQURtQjtHQUFyQjs7QUFRQSxVQUFRO0FBQ04sV0FBTyxJQUFJLFVBQUosQ0FBZSxLQUFLLEVBQUwsRUFBUyxLQUFLLFNBQUwsRUFBZ0IsS0FBSyxXQUFMLEVBQWtCLEtBQUssS0FBTCxDQUFqRSxDQURNO0dBQVI7Q0ExREY7a0JBZ0VlIiwiZmlsZSI6ImludGVybmFsL2Rpc3BhdGNoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBEaXNwYXRjaGVyIHtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnRJZCwgY29sbGVjdG9yLCBpZEdlbmVyYXRvciwgY2xvY2spIHtcbiAgICB0aGlzLmNvbGxlY3RvciA9IGNvbGxlY3RvcjtcbiAgICB0aGlzLmlkR2VuZXJhdG9yID0gaWRHZW5lcmF0b3I7XG4gICAgdGhpcy5jbG9jayA9IGNsb2NrO1xuXG4gICAgdGhpcy5pZCA9IGlkR2VuZXJhdG9yLm5leHQoKTtcbiAgICB0aGlzLnBhcmVudElkID0gcGFyZW50SWQ7XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBjbG9jay5ub3coKTtcbiAgfVxuXG5cbiAgaW52b2tlKG1vZHVsZSwgY29tcG9uZW50LCBmdW5jLCBhcmdzKSB7XG4gICAgdGhpcy5fdHJhY2tDYWxsKG1vZHVsZSwgY29tcG9uZW50LCBmdW5jLCBhcmdzKTtcblxuICAgIGxldCByZXN1bHQ7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG5ld0FyZ3MgPSBhcmdzLnNsaWNlKCk7XG4gICAgICBuZXdBcmdzLnVuc2hpZnQodGhpcy5fZm9yaygpKTtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29tcG9uZW50LCBuZXdBcmdzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuX3RyYWNrRXJyb3IoZXJyKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG5cbiAgICB0aGlzLl90cmFja1Jlc3VsdChyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuXG4gIF90cmFja0NhbGwobW9kdWxlLCBjb21wb25lbnQsIGZ1bmMsIGFyZ3MpIHtcbiAgICB0aGlzLmNvbGxlY3Rvci5hZGQoe1xuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBwYXJlbnRJZDogdGhpcy5wYXJlbnRJZCxcbiAgICAgIGNvbXBvbmVudDogY29tcG9uZW50LmNvbnN0cnVjdG9yLm5hbWUsXG4gICAgICBtZXRob2Q6IGZ1bmMubmFtZSxcbiAgICAgIGFyZ3VtZW50czogYXJncyxcbiAgICAgIHRpbWU6IHRoaXMuY2xvY2subm93KCksXG4gICAgfSk7XG4gIH1cblxuICBfdHJhY2tFcnJvcihlcnIpIHtcbiAgICB0aGlzLmNvbGxlY3Rvci5hZGQoe1xuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBlcnJvcjogZXJyLFxuICAgICAgdGltZTogdGhpcy5jbG9jay5ub3coKSxcbiAgICB9KTtcbiAgfVxuXG4gIF90cmFja1Jlc3VsdChyZXN1bHQpIHtcbiAgICB0aGlzLmNvbGxlY3Rvci5hZGQoe1xuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lOiB0aGlzLmNsb2NrLm5vdygpLFxuICAgIH0pO1xuICB9XG5cbiAgX2ZvcmsoKSB7XG4gICAgcmV0dXJuIG5ldyBEaXNwYXRjaGVyKHRoaXMuaWQsIHRoaXMuY29sbGVjdG9yLCB0aGlzLmlkR2VuZXJhdG9yLCB0aGlzLmNsb2NrKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERpc3BhdGNoZXI7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
