'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

let router;
let registry;
let cmdHandler;
let qryHandler;

describe('Router', () => {
  var _class, _temp, _class2, _temp2;

  beforeEach(() => {
    registry = {
      get: _sinon2.default.stub(),
      getConnection: _sinon2.default.stub()
    };
    cmdHandler = {
      handle: _sinon2.default.stub()
    };
    qryHandler = {
      handle: _sinon2.default.stub()
    };
    router = new _router2.default(registry, cmdHandler, qryHandler);
  });

  it('should call a Processor', _asyncToGenerator(function* () {
    let MyComponent = (_temp = _class = class MyComponent {}, _class.__meta = {
      type: {
        typeName: 'Processor'
      }
    }, _temp);


    registry.getConnection.returns(MyComponent);
    registry.get.returns(new MyComponent());
    cmdHandler.handle.returns('success');

    var _ref = yield router.handle({});

    const result = _ref.result;

    _assert2.default.equal(result, 'success');
  }));

  it('should call an Accessor', _asyncToGenerator(function* () {
    let MyComponent = (_temp2 = _class2 = class MyComponent {}, _class2.__meta = {
      type: {
        typeName: 'Accessor'
      }
    }, _temp2);


    registry.getConnection.returns(MyComponent);
    registry.get.returns(new MyComponent());
    qryHandler.handle.returns('success');

    var _ref2 = yield router.handle({});

    const result = _ref2.result;

    _assert2.default.equal(result, 'success');
  }));

  // it('should fail for unhandled type', async () => {
  //   class MyCommand {
  //   }
  //
  //   assert.throws(
  //     async () => await router.handle(MyCommand),
  //     (err) =>
  //       err.message === `unable to handle signal: no matching handler found for 'MyCommand'`);
  // });
  //
  // it('should fail for invalid component type', () => {
  //   class MyComponent {
  //     static __meta = {
  //       type: {
  //         typeName: 'Behavior',
  //       },
  //     };
  //   }
  //
  //   registry.getConnection.returns(MyComponent);
  //
  //   assert.throws(
  //     async () => await router.handle({}),
  //     (err) =>
  //       err.message === `unable to handle signal: Component must be 'Accessor' or 'Processor' but is 'Behavior'`);
  // });
  //
  // it('should fail for unknown component', async () => {
  //   class MyComponent {
  //     static __meta = {
  //       type: {
  //         typeName: 'Processor',
  //       },
  //     };
  //   }
  //
  //   registry.getConnection.returns(MyComponent);
  //   registry.get.throws(new Error('not found'));
  //
  //   assert.throws(
  //     async () => await router.handle({}),
  //     (err) => err.message === `not found`);
  // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL3JvdXRlci5zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLElBQUksTUFBSjtBQUNBLElBQUksUUFBSjtBQUNBLElBQUksVUFBSjtBQUNBLElBQUksVUFBSjs7QUFFQSxTQUFTLFFBQVQsRUFBbUIsTUFBTTs7O0FBQ3ZCLGFBQVcsTUFBTTtBQUNmLGVBQVc7QUFDVCxXQUFLLGdCQUFNLElBQU4sRUFBTDtBQUNBLHFCQUFlLGdCQUFNLElBQU4sRUFBZjtLQUZGLENBRGU7QUFLZixpQkFBYTtBQUNYLGNBQVEsZ0JBQU0sSUFBTixFQUFSO0tBREYsQ0FMZTtBQVFmLGlCQUFhO0FBQ1gsY0FBUSxnQkFBTSxJQUFOLEVBQVI7S0FERixDQVJlO0FBV2YsYUFBUyxxQkFBVyxRQUFYLEVBQXFCLFVBQXJCLEVBQWlDLFVBQWpDLENBQVQsQ0FYZTtHQUFOLENBQVgsQ0FEdUI7O0FBZXZCLEtBQUcseUJBQUgsb0JBQThCLGFBQVk7UUFDbEMsZ0NBQU4sTUFBTSxXQUFOLENBQWtCLEVBQWxCLFNBQ1MsU0FBUztBQUNkLFlBQU07QUFDSixrQkFBVSxXQUFWO09BREY7Y0FIb0M7OztBQVN4QyxhQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBK0IsV0FBL0IsRUFUd0M7QUFVeEMsYUFBUyxHQUFULENBQWEsT0FBYixDQUFxQixJQUFJLFdBQUosRUFBckIsRUFWd0M7QUFXeEMsZUFBVyxNQUFYLENBQWtCLE9BQWxCLENBQTBCLFNBQTFCLEVBWHdDOztlQWFyQixNQUFNLE9BQU8sTUFBUCxDQUFjLEVBQWQsQ0FBTixDQWJxQjs7VUFhaEMscUJBYmdDOztBQWN4QyxxQkFBTyxLQUFQLENBQWEsTUFBYixFQUFxQixTQUFyQixFQWR3QztHQUFaLENBQTlCLEVBZnVCOztBQWdDdkIsS0FBRyx5QkFBSCxvQkFBOEIsYUFBWTtRQUNsQyxrQ0FBTixNQUFNLFdBQU4sQ0FBa0IsRUFBbEIsVUFDUyxTQUFTO0FBQ2QsWUFBTTtBQUNKLGtCQUFVLFVBQVY7T0FERjtlQUhvQzs7O0FBU3hDLGFBQVMsYUFBVCxDQUF1QixPQUF2QixDQUErQixXQUEvQixFQVR3QztBQVV4QyxhQUFTLEdBQVQsQ0FBYSxPQUFiLENBQXFCLElBQUksV0FBSixFQUFyQixFQVZ3QztBQVd4QyxlQUFXLE1BQVgsQ0FBa0IsT0FBbEIsQ0FBMEIsU0FBMUIsRUFYd0M7O2dCQWFyQixNQUFNLE9BQU8sTUFBUCxDQUFjLEVBQWQsQ0FBTixDQWJxQjs7VUFhaEMsc0JBYmdDOztBQWN4QyxxQkFBTyxLQUFQLENBQWEsTUFBYixFQUFxQixTQUFyQixFQWR3QztHQUFaLENBQTlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFoQ3VCLENBQU4sQ0FBbkIiLCJmaWxlIjoiaW50ZXJuYWwvcm91dGVyLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xuXG5pbXBvcnQgUm91dGVyIGZyb20gJy4vcm91dGVyJztcblxuXG5sZXQgcm91dGVyO1xubGV0IHJlZ2lzdHJ5O1xubGV0IGNtZEhhbmRsZXI7XG5sZXQgcXJ5SGFuZGxlcjtcblxuZGVzY3JpYmUoJ1JvdXRlcicsICgpID0+IHtcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgcmVnaXN0cnkgPSB7XG4gICAgICBnZXQ6IHNpbm9uLnN0dWIoKSxcbiAgICAgIGdldENvbm5lY3Rpb246IHNpbm9uLnN0dWIoKSxcbiAgICB9O1xuICAgIGNtZEhhbmRsZXIgPSB7XG4gICAgICBoYW5kbGU6IHNpbm9uLnN0dWIoKSxcbiAgICB9O1xuICAgIHFyeUhhbmRsZXIgPSB7XG4gICAgICBoYW5kbGU6IHNpbm9uLnN0dWIoKSxcbiAgICB9O1xuICAgIHJvdXRlciA9IG5ldyBSb3V0ZXIocmVnaXN0cnksIGNtZEhhbmRsZXIsIHFyeUhhbmRsZXIpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGNhbGwgYSBQcm9jZXNzb3InLCBhc3luYyAoKSA9PiB7XG4gICAgY2xhc3MgTXlDb21wb25lbnQge1xuICAgICAgc3RhdGljIF9fbWV0YSA9IHtcbiAgICAgICAgdHlwZToge1xuICAgICAgICAgIHR5cGVOYW1lOiAnUHJvY2Vzc29yJyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmVnaXN0cnkuZ2V0Q29ubmVjdGlvbi5yZXR1cm5zKE15Q29tcG9uZW50KTtcbiAgICByZWdpc3RyeS5nZXQucmV0dXJucyhuZXcgTXlDb21wb25lbnQoKSk7XG4gICAgY21kSGFuZGxlci5oYW5kbGUucmV0dXJucygnc3VjY2VzcycpO1xuXG4gICAgY29uc3QgeyByZXN1bHQgfSA9IGF3YWl0IHJvdXRlci5oYW5kbGUoe30pO1xuICAgIGFzc2VydC5lcXVhbChyZXN1bHQsICdzdWNjZXNzJyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgY2FsbCBhbiBBY2Nlc3NvcicsIGFzeW5jICgpID0+IHtcbiAgICBjbGFzcyBNeUNvbXBvbmVudCB7XG4gICAgICBzdGF0aWMgX19tZXRhID0ge1xuICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgdHlwZU5hbWU6ICdBY2Nlc3NvcicsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJlZ2lzdHJ5LmdldENvbm5lY3Rpb24ucmV0dXJucyhNeUNvbXBvbmVudCk7XG4gICAgcmVnaXN0cnkuZ2V0LnJldHVybnMobmV3IE15Q29tcG9uZW50KCkpO1xuICAgIHFyeUhhbmRsZXIuaGFuZGxlLnJldHVybnMoJ3N1Y2Nlc3MnKTtcblxuICAgIGNvbnN0IHsgcmVzdWx0IH0gPSBhd2FpdCByb3V0ZXIuaGFuZGxlKHt9KTtcbiAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCAnc3VjY2VzcycpO1xuICB9KTtcblxuICAvLyBpdCgnc2hvdWxkIGZhaWwgZm9yIHVuaGFuZGxlZCB0eXBlJywgYXN5bmMgKCkgPT4ge1xuICAvLyAgIGNsYXNzIE15Q29tbWFuZCB7XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIGFzc2VydC50aHJvd3MoXG4gIC8vICAgICBhc3luYyAoKSA9PiBhd2FpdCByb3V0ZXIuaGFuZGxlKE15Q29tbWFuZCksXG4gIC8vICAgICAoZXJyKSA9PlxuICAvLyAgICAgICBlcnIubWVzc2FnZSA9PT0gYHVuYWJsZSB0byBoYW5kbGUgc2lnbmFsOiBubyBtYXRjaGluZyBoYW5kbGVyIGZvdW5kIGZvciAnTXlDb21tYW5kJ2ApO1xuICAvLyB9KTtcbiAgLy9cbiAgLy8gaXQoJ3Nob3VsZCBmYWlsIGZvciBpbnZhbGlkIGNvbXBvbmVudCB0eXBlJywgKCkgPT4ge1xuICAvLyAgIGNsYXNzIE15Q29tcG9uZW50IHtcbiAgLy8gICAgIHN0YXRpYyBfX21ldGEgPSB7XG4gIC8vICAgICAgIHR5cGU6IHtcbiAgLy8gICAgICAgICB0eXBlTmFtZTogJ0JlaGF2aW9yJyxcbiAgLy8gICAgICAgfSxcbiAgLy8gICAgIH07XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIHJlZ2lzdHJ5LmdldENvbm5lY3Rpb24ucmV0dXJucyhNeUNvbXBvbmVudCk7XG4gIC8vXG4gIC8vICAgYXNzZXJ0LnRocm93cyhcbiAgLy8gICAgIGFzeW5jICgpID0+IGF3YWl0IHJvdXRlci5oYW5kbGUoe30pLFxuICAvLyAgICAgKGVycikgPT5cbiAgLy8gICAgICAgZXJyLm1lc3NhZ2UgPT09IGB1bmFibGUgdG8gaGFuZGxlIHNpZ25hbDogQ29tcG9uZW50IG11c3QgYmUgJ0FjY2Vzc29yJyBvciAnUHJvY2Vzc29yJyBidXQgaXMgJ0JlaGF2aW9yJ2ApO1xuICAvLyB9KTtcbiAgLy9cbiAgLy8gaXQoJ3Nob3VsZCBmYWlsIGZvciB1bmtub3duIGNvbXBvbmVudCcsIGFzeW5jICgpID0+IHtcbiAgLy8gICBjbGFzcyBNeUNvbXBvbmVudCB7XG4gIC8vICAgICBzdGF0aWMgX19tZXRhID0ge1xuICAvLyAgICAgICB0eXBlOiB7XG4gIC8vICAgICAgICAgdHlwZU5hbWU6ICdQcm9jZXNzb3InLFxuICAvLyAgICAgICB9LFxuICAvLyAgICAgfTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgcmVnaXN0cnkuZ2V0Q29ubmVjdGlvbi5yZXR1cm5zKE15Q29tcG9uZW50KTtcbiAgLy8gICByZWdpc3RyeS5nZXQudGhyb3dzKG5ldyBFcnJvcignbm90IGZvdW5kJykpO1xuICAvL1xuICAvLyAgIGFzc2VydC50aHJvd3MoXG4gIC8vICAgICBhc3luYyAoKSA9PiBhd2FpdCByb3V0ZXIuaGFuZGxlKHt9KSxcbiAgLy8gICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSBgbm90IGZvdW5kYCk7XG4gIC8vIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
