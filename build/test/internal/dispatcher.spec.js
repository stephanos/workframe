'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let dispatcher;
let collector;

describe('Dispatcher', () => {
  beforeEach(() => {
    collector = {
      add: _sinon2.default.spy()
    };

    const nextId = _sinon2.default.stub();
    nextId.onFirstCall().returns(1);
    nextId.onSecondCall().returns(2);
    const idGenerator = {
      next: nextId
    };

    const clock = {
      now: _sinon2.default.stub().returns(1234567890)
    };

    dispatcher = new _dispatcher2.default(null, collector, idGenerator, clock);
  });

  describe('should invoke', () => {
    it('method', () => {
      let called;
      let Component = class Component {
        doSomething() {
          called = true;
        }
      };


      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, []);

      _assert2.default.ok(called);
    });

    it('method with for of dispatcher as first argument', () => {
      let args;
      let Component = class Component {
        doSomething() {
          for (var _len = arguments.length, callArgs = Array(_len), _key = 0; _key < _len; _key++) {
            callArgs[_key] = arguments[_key];
          }

          args = callArgs;
        }
      };


      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, []);

      _assert2.default.equal(args[0].id, 2);
      _assert2.default.equal(args[0].parentId, 1);
    });

    it('method and return its value', () => {
      let Component = class Component {
        doSomething() {
          return 42;
        }
      };


      const comp = new Component();
      const ret = dispatcher.invoke({}, comp, comp.doSomething, []);

      _assert2.default.equal(ret, 42);
    });

    it('method and yield thrown exception', () => {
      let Component = class Component {
        doSomething() {
          throw new Error('oops');
        }
      };


      const comp = new Component();
      _assert2.default.throws(() => dispatcher.invoke({}, comp, comp.doSomething, []), Error);
    });
  });

  describe('should track', () => {
    it('invocation call', () => {
      let Component = class Component {
        doSomething() {
          return 42;
        }
      };


      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, []);

      _assert2.default.deepEqual(collector.add.firstCall.args, [{
        id: 1,
        parentId: null,
        component: 'Component',
        method: 'doSomething',
        arguments: [],
        time: 1234567890
      }]);
    });

    it('invocation call with arguments', () => {
      let Component = class Component {
        doSomething() {
          return 42;
        }
      };


      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, ['arg1', 'arg2']);

      _assert2.default.deepEqual(collector.add.firstCall.args, [{
        id: 1,
        parentId: null,
        component: 'Component',
        method: 'doSomething',
        arguments: ['arg1', 'arg2'],
        time: 1234567890
      }]);
    });

    it('invocation result', () => {
      let Component = class Component {
        doSomething() {
          return 42;
        }
      };


      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, []);

      _assert2.default.deepEqual(collector.add.secondCall.args, [{
        id: 1,
        result: 42,
        time: 1234567890
      }]);
    });

    it('invocation exception', () => {
      let Component = class Component {
        doSomething() {
          throw new Error('oops');
        }
      };


      const comp = new Component();
      try {
        dispatcher.invoke({}, comp, comp.doSomething, []);
      } catch (err) {
        // ignore
      }

      _assert2.default.deepEqual(collector.add.secondCall.args, [{
        id: 1,
        error: new Error('oops'),
        time: 1234567890
      }]);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2Rpc3BhdGNoZXIuc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsSUFBSSxVQUFKO0FBQ0EsSUFBSSxTQUFKOztBQUVBLFNBQVMsWUFBVCxFQUF1QixNQUFNO0FBQzNCLGFBQVcsTUFBTTtBQUNmLGdCQUFZO0FBQ1YsV0FBSyxnQkFBTSxHQUFOLEVBQUw7S0FERixDQURlOztBQUtmLFVBQU0sU0FBUyxnQkFBTSxJQUFOLEVBQVQsQ0FMUztBQU1mLFdBQU8sV0FBUCxHQUFxQixPQUFyQixDQUE2QixDQUE3QixFQU5lO0FBT2YsV0FBTyxZQUFQLEdBQXNCLE9BQXRCLENBQThCLENBQTlCLEVBUGU7QUFRZixVQUFNLGNBQWM7QUFDbEIsWUFBTSxNQUFOO0tBREksQ0FSUzs7QUFZZixVQUFNLFFBQVE7QUFDWixXQUFLLGdCQUFNLElBQU4sR0FBYSxPQUFiLENBQXFCLFVBQXJCLENBQUw7S0FESSxDQVpTOztBQWdCZixpQkFBYSx5QkFBZSxJQUFmLEVBQXFCLFNBQXJCLEVBQWdDLFdBQWhDLEVBQTZDLEtBQTdDLENBQWIsQ0FoQmU7R0FBTixDQUFYLENBRDJCOztBQW9CM0IsV0FBUyxlQUFULEVBQTBCLE1BQU07QUFDOUIsT0FBRyxRQUFILEVBQWEsTUFBTTtBQUNqQixVQUFJLE1BQUosQ0FEaUI7VUFFWCxZQUFOLE1BQU0sU0FBTixDQUFnQjtBQUNkLHNCQUFjO0FBQ1osbUJBQVMsSUFBVCxDQURZO1NBQWQ7T0FERixDQUZpQjs7O0FBUWpCLFlBQU0sT0FBTyxJQUFJLFNBQUosRUFBUCxDQVJXO0FBU2pCLGlCQUFXLE1BQVgsQ0FBa0IsRUFBbEIsRUFBc0IsSUFBdEIsRUFBNEIsS0FBSyxXQUFMLEVBQWtCLEVBQTlDLEVBVGlCOztBQVdqQix1QkFBTyxFQUFQLENBQVUsTUFBVixFQVhpQjtLQUFOLENBQWIsQ0FEOEI7O0FBZTlCLE9BQUcsaURBQUgsRUFBc0QsTUFBTTtBQUMxRCxVQUFJLElBQUos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dkIiLCJmaWxlIjoiaW50ZXJuYWwvZGlzcGF0Y2hlci5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcblxuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSAnLi9kaXNwYXRjaGVyJztcblxuXG5sZXQgZGlzcGF0Y2hlcjtcbmxldCBjb2xsZWN0b3I7XG5cbmRlc2NyaWJlKCdEaXNwYXRjaGVyJywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBjb2xsZWN0b3IgPSB7XG4gICAgICBhZGQ6IHNpbm9uLnNweSgpLFxuICAgIH07XG5cbiAgICBjb25zdCBuZXh0SWQgPSBzaW5vbi5zdHViKCk7XG4gICAgbmV4dElkLm9uRmlyc3RDYWxsKCkucmV0dXJucygxKTtcbiAgICBuZXh0SWQub25TZWNvbmRDYWxsKCkucmV0dXJucygyKTtcbiAgICBjb25zdCBpZEdlbmVyYXRvciA9IHtcbiAgICAgIG5leHQ6IG5leHRJZCxcbiAgICB9O1xuXG4gICAgY29uc3QgY2xvY2sgPSB7XG4gICAgICBub3c6IHNpbm9uLnN0dWIoKS5yZXR1cm5zKDEyMzQ1Njc4OTApLFxuICAgIH07XG5cbiAgICBkaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIobnVsbCwgY29sbGVjdG9yLCBpZEdlbmVyYXRvciwgY2xvY2spO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2hvdWxkIGludm9rZScsICgpID0+IHtcbiAgICBpdCgnbWV0aG9kJywgKCkgPT4ge1xuICAgICAgbGV0IGNhbGxlZDtcbiAgICAgIGNsYXNzIENvbXBvbmVudCB7XG4gICAgICAgIGRvU29tZXRoaW5nKCkge1xuICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY29tcCA9IG5ldyBDb21wb25lbnQoKTtcbiAgICAgIGRpc3BhdGNoZXIuaW52b2tlKHt9LCBjb21wLCBjb21wLmRvU29tZXRoaW5nLCBbXSk7XG5cbiAgICAgIGFzc2VydC5vayhjYWxsZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ21ldGhvZCB3aXRoIGZvciBvZiBkaXNwYXRjaGVyIGFzIGZpcnN0IGFyZ3VtZW50JywgKCkgPT4ge1xuICAgICAgbGV0IGFyZ3M7XG4gICAgICBjbGFzcyBDb21wb25lbnQge1xuICAgICAgICBkb1NvbWV0aGluZyguLi5jYWxsQXJncykge1xuICAgICAgICAgIGFyZ3MgPSBjYWxsQXJncztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb21wID0gbmV3IENvbXBvbmVudCgpO1xuICAgICAgZGlzcGF0Y2hlci5pbnZva2Uoe30sIGNvbXAsIGNvbXAuZG9Tb21ldGhpbmcsIFtdKTtcblxuICAgICAgYXNzZXJ0LmVxdWFsKGFyZ3NbMF0uaWQsIDIpO1xuICAgICAgYXNzZXJ0LmVxdWFsKGFyZ3NbMF0ucGFyZW50SWQsIDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ21ldGhvZCBhbmQgcmV0dXJuIGl0cyB2YWx1ZScsICgpID0+IHtcbiAgICAgIGNsYXNzIENvbXBvbmVudCB7XG4gICAgICAgIGRvU29tZXRoaW5nKCkge1xuICAgICAgICAgIHJldHVybiA0MjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb21wID0gbmV3IENvbXBvbmVudCgpO1xuICAgICAgY29uc3QgcmV0ID0gZGlzcGF0Y2hlci5pbnZva2Uoe30sIGNvbXAsIGNvbXAuZG9Tb21ldGhpbmcsIFtdKTtcblxuICAgICAgYXNzZXJ0LmVxdWFsKHJldCwgNDIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ21ldGhvZCBhbmQgeWllbGQgdGhyb3duIGV4Y2VwdGlvbicsICgpID0+IHtcbiAgICAgIGNsYXNzIENvbXBvbmVudCB7XG4gICAgICAgIGRvU29tZXRoaW5nKCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignb29wcycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbXAgPSBuZXcgQ29tcG9uZW50KCk7XG4gICAgICBhc3NlcnQudGhyb3dzKCgpID0+IGRpc3BhdGNoZXIuaW52b2tlKHt9LCBjb21wLCBjb21wLmRvU29tZXRoaW5nLCBbXSksIEVycm9yKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3Nob3VsZCB0cmFjaycsICgpID0+IHtcbiAgICBpdCgnaW52b2NhdGlvbiBjYWxsJywgKCkgPT4ge1xuICAgICAgY2xhc3MgQ29tcG9uZW50IHtcbiAgICAgICAgZG9Tb21ldGhpbmcoKSB7XG4gICAgICAgICAgcmV0dXJuIDQyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbXAgPSBuZXcgQ29tcG9uZW50KCk7XG4gICAgICBkaXNwYXRjaGVyLmludm9rZSh7fSwgY29tcCwgY29tcC5kb1NvbWV0aGluZywgW10pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGNvbGxlY3Rvci5hZGQuZmlyc3RDYWxsLmFyZ3MsIFt7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICBwYXJlbnRJZDogbnVsbCxcbiAgICAgICAgY29tcG9uZW50OiAnQ29tcG9uZW50JyxcbiAgICAgICAgbWV0aG9kOiAnZG9Tb21ldGhpbmcnLFxuICAgICAgICBhcmd1bWVudHM6IFtdLFxuICAgICAgICB0aW1lOiAxMjM0NTY3ODkwLFxuICAgICAgfV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ludm9jYXRpb24gY2FsbCB3aXRoIGFyZ3VtZW50cycsICgpID0+IHtcbiAgICAgIGNsYXNzIENvbXBvbmVudCB7XG4gICAgICAgIGRvU29tZXRoaW5nKCkge1xuICAgICAgICAgIHJldHVybiA0MjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb21wID0gbmV3IENvbXBvbmVudCgpO1xuICAgICAgZGlzcGF0Y2hlci5pbnZva2Uoe30sIGNvbXAsIGNvbXAuZG9Tb21ldGhpbmcsIFsnYXJnMScsICdhcmcyJ10pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGNvbGxlY3Rvci5hZGQuZmlyc3RDYWxsLmFyZ3MsIFt7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICBwYXJlbnRJZDogbnVsbCxcbiAgICAgICAgY29tcG9uZW50OiAnQ29tcG9uZW50JyxcbiAgICAgICAgbWV0aG9kOiAnZG9Tb21ldGhpbmcnLFxuICAgICAgICBhcmd1bWVudHM6IFsnYXJnMScsICdhcmcyJ10sXG4gICAgICAgIHRpbWU6IDEyMzQ1Njc4OTAsXG4gICAgICB9XSk7XG4gICAgfSk7XG5cbiAgICBpdCgnaW52b2NhdGlvbiByZXN1bHQnLCAoKSA9PiB7XG4gICAgICBjbGFzcyBDb21wb25lbnQge1xuICAgICAgICBkb1NvbWV0aGluZygpIHtcbiAgICAgICAgICByZXR1cm4gNDI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY29tcCA9IG5ldyBDb21wb25lbnQoKTtcbiAgICAgIGRpc3BhdGNoZXIuaW52b2tlKHt9LCBjb21wLCBjb21wLmRvU29tZXRoaW5nLCBbXSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoY29sbGVjdG9yLmFkZC5zZWNvbmRDYWxsLmFyZ3MsIFt7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICByZXN1bHQ6IDQyLFxuICAgICAgICB0aW1lOiAxMjM0NTY3ODkwLFxuICAgICAgfV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ludm9jYXRpb24gZXhjZXB0aW9uJywgKCkgPT4ge1xuICAgICAgY2xhc3MgQ29tcG9uZW50IHtcbiAgICAgICAgZG9Tb21ldGhpbmcoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvb3BzJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY29tcCA9IG5ldyBDb21wb25lbnQoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRpc3BhdGNoZXIuaW52b2tlKHt9LCBjb21wLCBjb21wLmRvU29tZXRoaW5nLCBbXSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gaWdub3JlXG4gICAgICB9XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoY29sbGVjdG9yLmFkZC5zZWNvbmRDYWxsLmFyZ3MsIFt7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICBlcnJvcjogbmV3IEVycm9yKCdvb3BzJyksXG4gICAgICAgIHRpbWU6IDEyMzQ1Njc4OTAsXG4gICAgICB9XSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=