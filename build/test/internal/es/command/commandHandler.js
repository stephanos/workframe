'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let getAggregateStream = function () {
  var ref = _asyncToGenerator(function* (store, command) {
    return yield store.getEventStream({
      context: command.aggregateContext,
      name: command.aggregateName,
      id: command.aggregateId
    });
  });

  return function getAggregateStream(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

var _immutable = require('immutable');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function buildAggregate(registry, aggregateStream) {
  const initialAggregate = {};
  const aggregateEvents = aggregateStream.get('events');
  return aggregateEvents.reduce((aggr, evt) => {
    const aggregator = registry.getConnection('aggregates', evt.name)[0];
    return aggregator.aggregate(aggr, evt);
  }, initialAggregate);
}

let CommandHandler = class CommandHandler {

  constructor(store, registry) {
    this.store = store;
    this.registry = registry;
  }

  handle(processFn, command) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const aggregateStream = yield getAggregateStream(_this.store, command);
      const aggregate = buildAggregate(_this.registry, aggregateStream);
      const eventPayload = yield processFn(aggregate, command);
      if (!eventPayload) {
        return null; // TODO
      }
      const eventPayloads = _immutable.List.of(eventPayload.toMap()); // TODO
      const events = eventPayloads.map(function (payload, idx) {
        return (0, _immutable.Map)({
          command: {
            name: command.constructor.name,
            id: command.id
          },
          // context: TODO,
          payload,
          // name: TOOD,
          // version: TODO,
          aggregate: {
            // context: command.aggregate.context,
            // name: command.aggregate.name,
            // id: command.aggregate.id, //  || eventPayload[0].aggregateId
            revision: (aggregateStream.aggregateRevision || 0) + idx
          }
        });
      });

      yield _this.store.addEvents(events);

      return events;
    })();
  }
};
exports.default = CommandHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2VzL2NvbW1hbmQvY29tbWFuZEhhbmRsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs4QkFHQSxXQUFrQyxLQUFsQyxFQUF5QyxPQUF6QyxFQUFrRDtBQUNoRCxXQUFPLE1BQU0sTUFBTSxjQUFOLENBQXFCO0FBQ2hDLGVBQVMsUUFBUSxnQkFBUjtBQUNULFlBQU0sUUFBUSxhQUFSO0FBQ04sVUFBSSxRQUFRLFdBQVI7S0FITyxDQUFOLENBRHlDO0dBQWxEOztrQkFBZTs7Ozs7Ozs7O0FBUWYsU0FBUyxjQUFULENBQXdCLFFBQXhCLEVBQWtDLGVBQWxDLEVBQW1EO0FBQ2pELFFBQU0sbUJBQW1CLEVBQW5CLENBRDJDO0FBRWpELFFBQU0sa0JBQWtCLGdCQUFnQixHQUFoQixDQUFvQixRQUFwQixDQUFsQixDQUYyQztBQUdqRCxTQUFPLGdCQUFnQixNQUFoQixDQUF1QixDQUFDLElBQUQsRUFBTyxHQUFQLEtBQWU7QUFDM0MsVUFBTSxhQUFhLFNBQVMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxJQUFJLElBQUosQ0FBckMsQ0FBK0MsQ0FBL0MsQ0FBYixDQURxQztBQUUzQyxXQUFPLFdBQVcsU0FBWCxDQUFxQixJQUFyQixFQUEyQixHQUEzQixDQUFQLENBRjJDO0dBQWYsRUFHM0IsZ0JBSEksQ0FBUCxDQUhpRDtDQUFuRDs7SUFVTSxpQkFBTixNQUFNLGNBQU4sQ0FBcUI7O0FBRW5CLGNBQVksS0FBWixFQUFtQixRQUFuQixFQUE2QjtBQUMzQixTQUFLLEtBQUwsR0FBYSxLQUFiLENBRDJCO0FBRTNCLFNBQUssUUFBTCxHQUFnQixRQUFoQixDQUYyQjtHQUE3Qjs7QUFLQSxTQUFhLFNBQWIsRUFBd0IsT0FBeEIsRUFBaUM7Ozs7QUFDL0IsWUFBTSxrQkFBa0IsTUFBTSxtQkFBbUIsTUFBSyxLQUFMLEVBQVksT0FBL0IsQ0FBTjtBQUN4QixZQUFNLFlBQVksZUFBZSxNQUFLLFFBQUwsRUFBZSxlQUE5QixDQUFaO0FBQ04sWUFBTSxlQUFlLE1BQU0sVUFBVSxTQUFWLEVBQXFCLE9BQXJCLENBQU47QUFDckIsVUFBSSxDQUFDLFlBQUQsRUFBZTtBQUNqQixlQUFPLElBQVA7QUFEaUIsT0FBbkI7QUFHQSxZQUFNLGdCQUFnQixnQkFBSyxFQUFMLENBQVEsYUFBYSxLQUFiLEVBQVIsQ0FBaEI7QUFDTixZQUFNLFNBQVMsY0FBYyxHQUFkLENBQWtCLFVBQUMsT0FBRCxFQUFVLEdBQVY7ZUFDL0Isb0JBQUk7QUFDRixtQkFBUztBQUNQLGtCQUFNLFFBQVEsV0FBUixDQUFvQixJQUFwQjtBQUNOLGdCQUFJLFFBQVEsRUFBUjtXQUZOOztBQUtBLGlCQU5FOzs7QUFTRixxQkFBVzs7OztBQUlULHNCQUFVLENBQUMsZ0JBQWdCLGlCQUFoQixJQUFxQyxDQUFyQyxDQUFELEdBQTJDLEdBQTNDO1dBSlo7U0FURjtPQUQrQixDQUEzQjs7QUFtQk4sWUFBTSxNQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLE1BQXJCLENBQU47O0FBRUEsYUFBTyxNQUFQO1NBN0IrQjtHQUFqQztDQVBGO2tCQXlDZSIsImZpbGUiOiJpbnRlcm5hbC9lcy9jb21tYW5kL2NvbW1hbmRIYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwLCBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcblxuXG5hc3luYyBmdW5jdGlvbiBnZXRBZ2dyZWdhdGVTdHJlYW0oc3RvcmUsIGNvbW1hbmQpIHtcbiAgcmV0dXJuIGF3YWl0IHN0b3JlLmdldEV2ZW50U3RyZWFtKHtcbiAgICBjb250ZXh0OiBjb21tYW5kLmFnZ3JlZ2F0ZUNvbnRleHQsXG4gICAgbmFtZTogY29tbWFuZC5hZ2dyZWdhdGVOYW1lLFxuICAgIGlkOiBjb21tYW5kLmFnZ3JlZ2F0ZUlkLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRBZ2dyZWdhdGUocmVnaXN0cnksIGFnZ3JlZ2F0ZVN0cmVhbSkge1xuICBjb25zdCBpbml0aWFsQWdncmVnYXRlID0ge307XG4gIGNvbnN0IGFnZ3JlZ2F0ZUV2ZW50cyA9IGFnZ3JlZ2F0ZVN0cmVhbS5nZXQoJ2V2ZW50cycpO1xuICByZXR1cm4gYWdncmVnYXRlRXZlbnRzLnJlZHVjZSgoYWdnciwgZXZ0KSA9PiB7XG4gICAgY29uc3QgYWdncmVnYXRvciA9IHJlZ2lzdHJ5LmdldENvbm5lY3Rpb24oJ2FnZ3JlZ2F0ZXMnLCBldnQubmFtZSlbMF07XG4gICAgcmV0dXJuIGFnZ3JlZ2F0b3IuYWdncmVnYXRlKGFnZ3IsIGV2dCk7XG4gIH0sIGluaXRpYWxBZ2dyZWdhdGUpO1xufVxuXG5cbmNsYXNzIENvbW1hbmRIYW5kbGVyIHtcblxuICBjb25zdHJ1Y3RvcihzdG9yZSwgcmVnaXN0cnkpIHtcbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgdGhpcy5yZWdpc3RyeSA9IHJlZ2lzdHJ5O1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlKHByb2Nlc3NGbiwgY29tbWFuZCkge1xuICAgIGNvbnN0IGFnZ3JlZ2F0ZVN0cmVhbSA9IGF3YWl0IGdldEFnZ3JlZ2F0ZVN0cmVhbSh0aGlzLnN0b3JlLCBjb21tYW5kKTtcbiAgICBjb25zdCBhZ2dyZWdhdGUgPSBidWlsZEFnZ3JlZ2F0ZSh0aGlzLnJlZ2lzdHJ5LCBhZ2dyZWdhdGVTdHJlYW0pO1xuICAgIGNvbnN0IGV2ZW50UGF5bG9hZCA9IGF3YWl0IHByb2Nlc3NGbihhZ2dyZWdhdGUsIGNvbW1hbmQpO1xuICAgIGlmICghZXZlbnRQYXlsb2FkKSB7XG4gICAgICByZXR1cm4gbnVsbDsgLy8gVE9ET1xuICAgIH1cbiAgICBjb25zdCBldmVudFBheWxvYWRzID0gTGlzdC5vZihldmVudFBheWxvYWQudG9NYXAoKSk7IC8vIFRPRE9cbiAgICBjb25zdCBldmVudHMgPSBldmVudFBheWxvYWRzLm1hcCgocGF5bG9hZCwgaWR4KSA9PlxuICAgICAgTWFwKHtcbiAgICAgICAgY29tbWFuZDoge1xuICAgICAgICAgIG5hbWU6IGNvbW1hbmQuY29uc3RydWN0b3IubmFtZSxcbiAgICAgICAgICBpZDogY29tbWFuZC5pZCxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gY29udGV4dDogVE9ETyxcbiAgICAgICAgcGF5bG9hZCxcbiAgICAgICAgLy8gbmFtZTogVE9PRCxcbiAgICAgICAgLy8gdmVyc2lvbjogVE9ETyxcbiAgICAgICAgYWdncmVnYXRlOiB7XG4gICAgICAgICAgLy8gY29udGV4dDogY29tbWFuZC5hZ2dyZWdhdGUuY29udGV4dCxcbiAgICAgICAgICAvLyBuYW1lOiBjb21tYW5kLmFnZ3JlZ2F0ZS5uYW1lLFxuICAgICAgICAgIC8vIGlkOiBjb21tYW5kLmFnZ3JlZ2F0ZS5pZCwgLy8gIHx8IGV2ZW50UGF5bG9hZFswXS5hZ2dyZWdhdGVJZFxuICAgICAgICAgIHJldmlzaW9uOiAoYWdncmVnYXRlU3RyZWFtLmFnZ3JlZ2F0ZVJldmlzaW9uIHx8IDApICsgaWR4LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgYXdhaXQgdGhpcy5zdG9yZS5hZGRFdmVudHMoZXZlbnRzKTtcblxuICAgIHJldHVybiBldmVudHM7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDb21tYW5kSGFuZGxlcjtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
