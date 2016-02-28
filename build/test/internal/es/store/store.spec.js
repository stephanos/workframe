'use strict';

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _immutable = require('immutable');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

describe('Event Store', () => {
  let clock;
  let store;
  let storage;
  let idGenerator;

  before(() => {
    clock = {
      now: _sinon2.default.stub().returns(new Date(0))
    };
    idGenerator = {
      next: _sinon2.default.stub().returns('42')
    };
    storage = {
      addEvents: _sinon2.default.mock().returns(Promise.resolve()),
      getEventStream: _sinon2.default.mock().returns(Promise.resolve((0, _immutable.List)()))
    };

    store = new _store2.default(storage, idGenerator, clock);
  });

  it('add events', _asyncToGenerator(function* () {
    const evt1 = (0, _immutable.Map)();
    const evt2 = (0, _immutable.Map)();
    yield store.addEvents(_immutable.List.of(evt1, evt2));

    _assert2.default.ok(storage.addEvents.calledOnce);
    _assert2.default.deepEqual(storage.addEvents.getCall(0).args[0].toJS(), [{
      id: '42-0',
      commit: {
        id: '42',
        sequence: 0,
        size: 2,
        timestamp: new Date(0)
      }
    }, {
      id: '42-1',
      commit: {
        id: '42',
        sequence: 1,
        size: 2,
        timestamp: new Date(0)
      }
    }]);
  }));

  // it('get empty event stream', async () => {
  //   const stream = await store.getEventStream();
  // });
  //
  // it('get non-empty event stream', async () => {
  //   storage.getEventStream.returns(Promise.resolve(List(
  //     Map({
  //
  //     }), Map({
  //
  //     }))))
  // })
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2VzL3N0b3JlL3N0b3JlLnNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSxTQUFTLGFBQVQsRUFBd0IsTUFBTTtBQUM1QixNQUFJLEtBQUosQ0FENEI7QUFFNUIsTUFBSSxLQUFKLENBRjRCO0FBRzVCLE1BQUksT0FBSixDQUg0QjtBQUk1QixNQUFJLFdBQUosQ0FKNEI7O0FBTTVCLFNBQU8sTUFBTTtBQUNYLFlBQVE7QUFDTixXQUFLLGdCQUFNLElBQU4sR0FBYSxPQUFiLENBQXFCLElBQUksSUFBSixDQUFTLENBQVQsQ0FBckIsQ0FBTDtLQURGLENBRFc7QUFJWCxrQkFBYztBQUNaLFlBQU0sZ0JBQU0sSUFBTixHQUFhLE9BQWIsQ0FBcUIsSUFBckIsQ0FBTjtLQURGLENBSlc7QUFPWCxjQUFVO0FBQ1IsaUJBQVcsZ0JBQU0sSUFBTixHQUFhLE9BQWIsQ0FBcUIsUUFBUSxPQUFSLEVBQXJCLENBQVg7QUFDQSxzQkFBZ0IsZ0JBQU0sSUFBTixHQUFhLE9BQWIsQ0FBcUIsUUFBUSxPQUFSLENBQWdCLHNCQUFoQixDQUFyQixDQUFoQjtLQUZGLENBUFc7O0FBWVgsWUFBUSxvQkFBZSxPQUFmLEVBQXdCLFdBQXhCLEVBQXFDLEtBQXJDLENBQVIsQ0FaVztHQUFOLENBQVAsQ0FONEI7O0FBcUI1QixLQUFHLFlBQUgsb0JBQWlCLGFBQVk7QUFDM0IsVUFBTSxPQUFPLHFCQUFQLENBRHFCO0FBRTNCLFVBQU0sT0FBTyxxQkFBUCxDQUZxQjtBQUczQixVQUFNLE1BQU0sU0FBTixDQUFnQixnQkFBSyxFQUFMLENBQVEsSUFBUixFQUFjLElBQWQsQ0FBaEIsQ0FBTixDQUgyQjs7QUFLM0IscUJBQU8sRUFBUCxDQUFVLFFBQVEsU0FBUixDQUFrQixVQUFsQixDQUFWLENBTDJCO0FBTTNCLHFCQUFPLFNBQVAsQ0FBaUIsUUFBUSxTQUFSLENBQWtCLE9BQWxCLENBQTBCLENBQTFCLEVBQTZCLElBQTdCLENBQWtDLENBQWxDLEVBQXFDLElBQXJDLEVBQWpCLEVBQThELENBQzVEO0FBQ0UsVUFBSSxNQUFKO0FBQ0EsY0FBUTtBQUNOLFlBQUksSUFBSjtBQUNBLGtCQUFVLENBQVY7QUFDQSxjQUFNLENBQU47QUFDQSxtQkFBVyxJQUFJLElBQUosQ0FBUyxDQUFULENBQVg7T0FKRjtLQUgwRCxFQVN6RDtBQUNELFVBQUksTUFBSjtBQUNBLGNBQVE7QUFDTixZQUFJLElBQUo7QUFDQSxrQkFBVSxDQUFWO0FBQ0EsY0FBTSxDQUFOO0FBQ0EsbUJBQVcsSUFBSSxJQUFKLENBQVMsQ0FBVCxDQUFYO09BSkY7S0FYMEQsQ0FBOUQsRUFOMkI7R0FBWixDQUFqQjs7Ozs7Ozs7Ozs7Ozs7QUFyQjRCLENBQU4sQ0FBeEIiLCJmaWxlIjoiaW50ZXJuYWwvZXMvc3RvcmUvc3RvcmUuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgeyBNYXAsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuXG5pbXBvcnQgRXZlbnRTdG9yZSBmcm9tICcuL3N0b3JlJztcblxuXG5kZXNjcmliZSgnRXZlbnQgU3RvcmUnLCAoKSA9PiB7XG4gIGxldCBjbG9jaztcbiAgbGV0IHN0b3JlO1xuICBsZXQgc3RvcmFnZTtcbiAgbGV0IGlkR2VuZXJhdG9yO1xuXG4gIGJlZm9yZSgoKSA9PiB7XG4gICAgY2xvY2sgPSB7XG4gICAgICBub3c6IHNpbm9uLnN0dWIoKS5yZXR1cm5zKG5ldyBEYXRlKDApKSxcbiAgICB9O1xuICAgIGlkR2VuZXJhdG9yID0ge1xuICAgICAgbmV4dDogc2lub24uc3R1YigpLnJldHVybnMoJzQyJyksXG4gICAgfTtcbiAgICBzdG9yYWdlID0ge1xuICAgICAgYWRkRXZlbnRzOiBzaW5vbi5tb2NrKCkucmV0dXJucyhQcm9taXNlLnJlc29sdmUoKSksXG4gICAgICBnZXRFdmVudFN0cmVhbTogc2lub24ubW9jaygpLnJldHVybnMoUHJvbWlzZS5yZXNvbHZlKExpc3QoKSkpLFxuICAgIH07XG5cbiAgICBzdG9yZSA9IG5ldyBFdmVudFN0b3JlKHN0b3JhZ2UsIGlkR2VuZXJhdG9yLCBjbG9jayk7XG4gIH0pO1xuXG4gIGl0KCdhZGQgZXZlbnRzJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGV2dDEgPSBNYXAoKTtcbiAgICBjb25zdCBldnQyID0gTWFwKCk7XG4gICAgYXdhaXQgc3RvcmUuYWRkRXZlbnRzKExpc3Qub2YoZXZ0MSwgZXZ0MikpO1xuXG4gICAgYXNzZXJ0Lm9rKHN0b3JhZ2UuYWRkRXZlbnRzLmNhbGxlZE9uY2UpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoc3RvcmFnZS5hZGRFdmVudHMuZ2V0Q2FsbCgwKS5hcmdzWzBdLnRvSlMoKSwgW1xuICAgICAge1xuICAgICAgICBpZDogJzQyLTAnLFxuICAgICAgICBjb21taXQ6IHtcbiAgICAgICAgICBpZDogJzQyJyxcbiAgICAgICAgICBzZXF1ZW5jZTogMCxcbiAgICAgICAgICBzaXplOiAyLFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoMCksXG4gICAgICAgIH0sXG4gICAgICB9LCB7XG4gICAgICAgIGlkOiAnNDItMScsXG4gICAgICAgIGNvbW1pdDoge1xuICAgICAgICAgIGlkOiAnNDInLFxuICAgICAgICAgIHNlcXVlbmNlOiAxLFxuICAgICAgICAgIHNpemU6IDIsXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgwKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSk7XG4gIH0pO1xuXG4gIC8vIGl0KCdnZXQgZW1wdHkgZXZlbnQgc3RyZWFtJywgYXN5bmMgKCkgPT4ge1xuICAvLyAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IHN0b3JlLmdldEV2ZW50U3RyZWFtKCk7XG4gIC8vIH0pO1xuICAvL1xuICAvLyBpdCgnZ2V0IG5vbi1lbXB0eSBldmVudCBzdHJlYW0nLCBhc3luYyAoKSA9PiB7XG4gIC8vICAgc3RvcmFnZS5nZXRFdmVudFN0cmVhbS5yZXR1cm5zKFByb21pc2UucmVzb2x2ZShMaXN0KFxuICAvLyAgICAgTWFwKHtcbiAgLy9cbiAgLy8gICAgIH0pLCBNYXAoe1xuICAvL1xuICAvLyAgICAgfSkpKSlcbiAgLy8gfSlcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
