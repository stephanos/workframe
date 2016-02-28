'use strict';

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _immutable = require('immutable');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _memory = require('./storage/memory');

var _memory2 = _interopRequireDefault(_memory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function memory() {
  return new _memory2.default();
}

describe('Event Store IT', () => {
  let store;

  [memory].forEach(storageFactory => {
    describe(`storage engine '${ storageFactory.name }'`, () => {
      beforeEach(() => {
        const idGenerator = {
          next: _sinon2.default.stub().returns('42')
        };
        const clock = {
          now: _sinon2.default.stub().returns(new Date(0))
        };
        store = new _store2.default(storageFactory(), idGenerator, clock);
      });

      it('should add add events', _asyncToGenerator(function* () {
        const evt1 = (0, _immutable.Map)();
        const evt2 = (0, _immutable.Map)();
        yield store.addEvents(_immutable.List.of(evt1, evt2));
      }));

      it('should return event stream', _asyncToGenerator(function* () {
        const aggrRef = { context: 'ctx', name: 'name', id: 'id' };
        const data = (0, _immutable.fromJS)({ aggregate: aggrRef });
        const evt1 = data.mergeDeep({ aggregate: { revision: 0 } });
        const evt2 = data.mergeDeep({ aggregate: { revision: 1 } });
        yield store.addEvents(_immutable.List.of(evt1, evt2));

        const stream = yield store.getEventStream(aggrRef, {});
        _assert2.default.deepEqual(stream.toJS(), {
          aggregate: {
            context: 'ctx',
            name: 'name',
            id: 'id',
            revision: 1
          },
          events: [{
            id: '42-0',
            aggregate: {
              context: 'ctx',
              name: 'name',
              id: 'id',
              revision: 0
            },
            commit: {
              id: '42',
              sequence: 0,
              size: 2,
              timestamp: new Date(0)
            }
          }, {
            id: '42-1',
            aggregate: {
              context: 'ctx',
              name: 'name',
              id: 'id',
              revision: 1
            },
            commit: {
              id: '42',
              sequence: 1,
              size: 2,
              timestamp: new Date(0)
            }
          }]
        });
      }));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2VzL3N0b3JlL3N0b3JlLml0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBLFNBQVMsTUFBVCxHQUFrQjtBQUNoQixTQUFPLHNCQUFQLENBRGdCO0NBQWxCOztBQUlBLFNBQVMsZ0JBQVQsRUFBMkIsTUFBTTtBQUMvQixNQUFJLEtBQUosQ0FEK0I7O0FBRy9CLEdBQUMsTUFBRCxFQUFTLE9BQVQsQ0FBaUIsa0JBQW9CO0FBQ25DLGFBQVMsQ0FBQyxnQkFBRCxHQUFtQixlQUFlLElBQWYsRUFBb0IsQ0FBdkMsQ0FBVCxFQUFvRCxNQUFNO0FBQ3hELGlCQUFXLE1BQU07QUFDZixjQUFNLGNBQWM7QUFDbEIsZ0JBQU0sZ0JBQU0sSUFBTixHQUFhLE9BQWIsQ0FBcUIsSUFBckIsQ0FBTjtTQURJLENBRFM7QUFJZixjQUFNLFFBQVE7QUFDWixlQUFLLGdCQUFNLElBQU4sR0FBYSxPQUFiLENBQXFCLElBQUksSUFBSixDQUFTLENBQVQsQ0FBckIsQ0FBTDtTQURJLENBSlM7QUFPZixnQkFBUSxvQkFBZSxnQkFBZixFQUFpQyxXQUFqQyxFQUE4QyxLQUE5QyxDQUFSLENBUGU7T0FBTixDQUFYLENBRHdEOztBQVd4RCxTQUFHLHVCQUFILG9CQUE0QixhQUFZO0FBQ3RDLGNBQU0sT0FBTyxxQkFBUCxDQURnQztBQUV0QyxjQUFNLE9BQU8scUJBQVAsQ0FGZ0M7QUFHdEMsY0FBTSxNQUFNLFNBQU4sQ0FBZ0IsZ0JBQUssRUFBTCxDQUFRLElBQVIsRUFBYyxJQUFkLENBQWhCLENBQU4sQ0FIc0M7T0FBWixDQUE1QixFQVh3RDs7QUFpQnhELFNBQUcsNEJBQUgsb0JBQWlDLGFBQVk7QUFDM0MsY0FBTSxVQUFVLEVBQUUsU0FBUyxLQUFULEVBQWdCLE1BQU0sTUFBTixFQUFjLElBQUksSUFBSixFQUExQyxDQURxQztBQUUzQyxjQUFNLE9BQU8sdUJBQU8sRUFBRSxXQUFXLE9BQVgsRUFBVCxDQUFQLENBRnFDO0FBRzNDLGNBQU0sT0FBTyxLQUFLLFNBQUwsQ0FBZSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQVYsRUFBYixFQUFqQixDQUFQLENBSHFDO0FBSTNDLGNBQU0sT0FBTyxLQUFLLFNBQUwsQ0FBZSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQVYsRUFBYixFQUFqQixDQUFQLENBSnFDO0FBSzNDLGNBQU0sTUFBTSxTQUFOLENBQWdCLGdCQUFLLEVBQUwsQ0FBUSxJQUFSLEVBQWMsSUFBZCxDQUFoQixDQUFOLENBTDJDOztBQU8zQyxjQUFNLFNBQVMsTUFBTSxNQUFNLGNBQU4sQ0FBcUIsT0FBckIsRUFBOEIsRUFBOUIsQ0FBTixDQVA0QjtBQVEzQyx5QkFBTyxTQUFQLENBQWlCLE9BQU8sSUFBUCxFQUFqQixFQUFnQztBQUM5QixxQkFBVztBQUNULHFCQUFTLEtBQVQ7QUFDQSxrQkFBTSxNQUFOO0FBQ0EsZ0JBQUksSUFBSjtBQUNBLHNCQUFVLENBQVY7V0FKRjtBQU1BLGtCQUFRLENBQ047QUFDRSxnQkFBSSxNQUFKO0FBQ0EsdUJBQVc7QUFDVCx1QkFBUyxLQUFUO0FBQ0Esb0JBQU0sTUFBTjtBQUNBLGtCQUFJLElBQUo7QUFDQSx3QkFBVSxDQUFWO2FBSkY7QUFNQSxvQkFBUTtBQUNOLGtCQUFJLElBQUo7QUFDQSx3QkFBVSxDQUFWO0FBQ0Esb0JBQU0sQ0FBTjtBQUNBLHlCQUFXLElBQUksSUFBSixDQUFTLENBQVQsQ0FBWDthQUpGO1dBVEksRUFlSDtBQUNELGdCQUFJLE1BQUo7QUFDQSx1QkFBVztBQUNULHVCQUFTLEtBQVQ7QUFDQSxvQkFBTSxNQUFOO0FBQ0Esa0JBQUksSUFBSjtBQUNBLHdCQUFVLENBQVY7YUFKRjtBQU1BLG9CQUFRO0FBQ04sa0JBQUksSUFBSjtBQUNBLHdCQUFVLENBQVY7QUFDQSxvQkFBTSxDQUFOO0FBQ0EseUJBQVcsSUFBSSxJQUFKLENBQVMsQ0FBVCxDQUFYO2FBSkY7V0F2QkksQ0FBUjtTQVBGLEVBUjJDO09BQVosQ0FBakMsRUFqQndEO0tBQU4sQ0FBcEQsQ0FEbUM7R0FBcEIsQ0FBakIsQ0FIK0I7Q0FBTixDQUEzQiIsImZpbGUiOiJpbnRlcm5hbC9lcy9zdG9yZS9zdG9yZS5pdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgeyBNYXAsIExpc3QsIGZyb21KUyB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCBFdmVudFN0b3JlIGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IE1lbW9yeVN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlL21lbW9yeSc7XG5cblxuZnVuY3Rpb24gbWVtb3J5KCkge1xuICByZXR1cm4gbmV3IE1lbW9yeVN0b3JhZ2UoKTtcbn1cblxuZGVzY3JpYmUoJ0V2ZW50IFN0b3JlIElUJywgKCkgPT4ge1xuICBsZXQgc3RvcmU7XG5cbiAgW21lbW9yeV0uZm9yRWFjaCgoc3RvcmFnZUZhY3RvcnkpID0+IHtcbiAgICBkZXNjcmliZShgc3RvcmFnZSBlbmdpbmUgJyR7c3RvcmFnZUZhY3RvcnkubmFtZX0nYCwgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkR2VuZXJhdG9yID0ge1xuICAgICAgICAgIG5leHQ6IHNpbm9uLnN0dWIoKS5yZXR1cm5zKCc0MicpLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjbG9jayA9IHtcbiAgICAgICAgICBub3c6IHNpbm9uLnN0dWIoKS5yZXR1cm5zKG5ldyBEYXRlKDApKSxcbiAgICAgICAgfTtcbiAgICAgICAgc3RvcmUgPSBuZXcgRXZlbnRTdG9yZShzdG9yYWdlRmFjdG9yeSgpLCBpZEdlbmVyYXRvciwgY2xvY2spO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgYWRkIGFkZCBldmVudHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGV2dDEgPSBNYXAoKTtcbiAgICAgICAgY29uc3QgZXZ0MiA9IE1hcCgpO1xuICAgICAgICBhd2FpdCBzdG9yZS5hZGRFdmVudHMoTGlzdC5vZihldnQxLCBldnQyKSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZXZlbnQgc3RyZWFtJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBhZ2dyUmVmID0geyBjb250ZXh0OiAnY3R4JywgbmFtZTogJ25hbWUnLCBpZDogJ2lkJyB9O1xuICAgICAgICBjb25zdCBkYXRhID0gZnJvbUpTKHsgYWdncmVnYXRlOiBhZ2dyUmVmIH0pO1xuICAgICAgICBjb25zdCBldnQxID0gZGF0YS5tZXJnZURlZXAoeyBhZ2dyZWdhdGU6IHsgcmV2aXNpb246IDAgfSB9KTtcbiAgICAgICAgY29uc3QgZXZ0MiA9IGRhdGEubWVyZ2VEZWVwKHsgYWdncmVnYXRlOiB7IHJldmlzaW9uOiAxIH0gfSk7XG4gICAgICAgIGF3YWl0IHN0b3JlLmFkZEV2ZW50cyhMaXN0Lm9mKGV2dDEsIGV2dDIpKTtcblxuICAgICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBzdG9yZS5nZXRFdmVudFN0cmVhbShhZ2dyUmVmLCB7fSk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoc3RyZWFtLnRvSlMoKSwge1xuICAgICAgICAgIGFnZ3JlZ2F0ZToge1xuICAgICAgICAgICAgY29udGV4dDogJ2N0eCcsXG4gICAgICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgICAgICBpZDogJ2lkJyxcbiAgICAgICAgICAgIHJldmlzaW9uOiAxLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXZlbnRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnNDItMCcsXG4gICAgICAgICAgICAgIGFnZ3JlZ2F0ZToge1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6ICdjdHgnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgICAgICBpZDogJ2lkJyxcbiAgICAgICAgICAgICAgICByZXZpc2lvbjogMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY29tbWl0OiB7XG4gICAgICAgICAgICAgICAgaWQ6ICc0MicsXG4gICAgICAgICAgICAgICAgc2VxdWVuY2U6IDAsXG4gICAgICAgICAgICAgICAgc2l6ZTogMixcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKDApLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBpZDogJzQyLTEnLFxuICAgICAgICAgICAgICBhZ2dyZWdhdGU6IHtcbiAgICAgICAgICAgICAgICBjb250ZXh0OiAnY3R4JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgICAgICAgICAgaWQ6ICdpZCcsXG4gICAgICAgICAgICAgICAgcmV2aXNpb246IDEsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGNvbW1pdDoge1xuICAgICAgICAgICAgICAgIGlkOiAnNDInLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlOiAxLFxuICAgICAgICAgICAgICAgIHNpemU6IDIsXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgwKSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
