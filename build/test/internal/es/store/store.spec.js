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
  let store;
  let storage;

  before(() => {
    const clock = {
      now: _sinon2.default.stub().returns(new Date(0))
    };
    const idGenerator = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2VzL3N0b3JlL3N0b3JlLnNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSxTQUFTLGFBQVQsRUFBd0IsTUFBTTtBQUM1QixNQUFJLEtBQUosQ0FENEI7QUFFNUIsTUFBSSxPQUFKLENBRjRCOztBQUk1QixTQUFPLE1BQU07QUFDWCxVQUFNLFFBQVE7QUFDWixXQUFLLGdCQUFNLElBQU4sR0FBYSxPQUFiLENBQXFCLElBQUksSUFBSixDQUFTLENBQVQsQ0FBckIsQ0FBTDtLQURJLENBREs7QUFJWCxVQUFNLGNBQWM7QUFDbEIsWUFBTSxnQkFBTSxJQUFOLEdBQWEsT0FBYixDQUFxQixJQUFyQixDQUFOO0tBREksQ0FKSztBQU9YLGNBQVU7QUFDUixpQkFBVyxnQkFBTSxJQUFOLEdBQWEsT0FBYixDQUFxQixRQUFRLE9BQVIsRUFBckIsQ0FBWDtBQUNBLHNCQUFnQixnQkFBTSxJQUFOLEdBQWEsT0FBYixDQUFxQixRQUFRLE9BQVIsQ0FBZ0Isc0JBQWhCLENBQXJCLENBQWhCO0tBRkYsQ0FQVzs7QUFZWCxZQUFRLG9CQUFlLE9BQWYsRUFBd0IsV0FBeEIsRUFBcUMsS0FBckMsQ0FBUixDQVpXO0dBQU4sQ0FBUCxDQUo0Qjs7QUFtQjVCLEtBQUcsWUFBSCxvQkFBaUIsYUFBWTtBQUMzQixVQUFNLE9BQU8scUJBQVAsQ0FEcUI7QUFFM0IsVUFBTSxPQUFPLHFCQUFQLENBRnFCO0FBRzNCLFVBQU0sTUFBTSxTQUFOLENBQWdCLGdCQUFLLEVBQUwsQ0FBUSxJQUFSLEVBQWMsSUFBZCxDQUFoQixDQUFOLENBSDJCOztBQUszQixxQkFBTyxFQUFQLENBQVUsUUFBUSxTQUFSLENBQWtCLFVBQWxCLENBQVYsQ0FMMkI7QUFNM0IscUJBQU8sU0FBUCxDQUFpQixRQUFRLFNBQVIsQ0FBa0IsT0FBbEIsQ0FBMEIsQ0FBMUIsRUFBNkIsSUFBN0IsQ0FBa0MsQ0FBbEMsRUFBcUMsSUFBckMsRUFBakIsRUFBOEQsQ0FDNUQ7QUFDRSxVQUFJLE1BQUo7QUFDQSxjQUFRO0FBQ04sWUFBSSxJQUFKO0FBQ0Esa0JBQVUsQ0FBVjtBQUNBLGNBQU0sQ0FBTjtBQUNBLG1CQUFXLElBQUksSUFBSixDQUFTLENBQVQsQ0FBWDtPQUpGO0tBSDBELEVBU3pEO0FBQ0QsVUFBSSxNQUFKO0FBQ0EsY0FBUTtBQUNOLFlBQUksSUFBSjtBQUNBLGtCQUFVLENBQVY7QUFDQSxjQUFNLENBQU47QUFDQSxtQkFBVyxJQUFJLElBQUosQ0FBUyxDQUFULENBQVg7T0FKRjtLQVgwRCxDQUE5RCxFQU4yQjtHQUFaLENBQWpCOzs7Ozs7Ozs7Ozs7OztBQW5CNEIsQ0FBTixDQUF4QiIsImZpbGUiOiJpbnRlcm5hbC9lcy9zdG9yZS9zdG9yZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCBFdmVudFN0b3JlIGZyb20gJy4vc3RvcmUnO1xuXG5cbmRlc2NyaWJlKCdFdmVudCBTdG9yZScsICgpID0+IHtcbiAgbGV0IHN0b3JlO1xuICBsZXQgc3RvcmFnZTtcblxuICBiZWZvcmUoKCkgPT4ge1xuICAgIGNvbnN0IGNsb2NrID0ge1xuICAgICAgbm93OiBzaW5vbi5zdHViKCkucmV0dXJucyhuZXcgRGF0ZSgwKSksXG4gICAgfTtcbiAgICBjb25zdCBpZEdlbmVyYXRvciA9IHtcbiAgICAgIG5leHQ6IHNpbm9uLnN0dWIoKS5yZXR1cm5zKCc0MicpLFxuICAgIH07XG4gICAgc3RvcmFnZSA9IHtcbiAgICAgIGFkZEV2ZW50czogc2lub24ubW9jaygpLnJldHVybnMoUHJvbWlzZS5yZXNvbHZlKCkpLFxuICAgICAgZ2V0RXZlbnRTdHJlYW06IHNpbm9uLm1vY2soKS5yZXR1cm5zKFByb21pc2UucmVzb2x2ZShMaXN0KCkpKSxcbiAgICB9O1xuXG4gICAgc3RvcmUgPSBuZXcgRXZlbnRTdG9yZShzdG9yYWdlLCBpZEdlbmVyYXRvciwgY2xvY2spO1xuICB9KTtcblxuICBpdCgnYWRkIGV2ZW50cycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBldnQxID0gTWFwKCk7XG4gICAgY29uc3QgZXZ0MiA9IE1hcCgpO1xuICAgIGF3YWl0IHN0b3JlLmFkZEV2ZW50cyhMaXN0Lm9mKGV2dDEsIGV2dDIpKTtcblxuICAgIGFzc2VydC5vayhzdG9yYWdlLmFkZEV2ZW50cy5jYWxsZWRPbmNlKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHN0b3JhZ2UuYWRkRXZlbnRzLmdldENhbGwoMCkuYXJnc1swXS50b0pTKCksIFtcbiAgICAgIHtcbiAgICAgICAgaWQ6ICc0Mi0wJyxcbiAgICAgICAgY29tbWl0OiB7XG4gICAgICAgICAgaWQ6ICc0MicsXG4gICAgICAgICAgc2VxdWVuY2U6IDAsXG4gICAgICAgICAgc2l6ZTogMixcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKDApLFxuICAgICAgICB9LFxuICAgICAgfSwge1xuICAgICAgICBpZDogJzQyLTEnLFxuICAgICAgICBjb21taXQ6IHtcbiAgICAgICAgICBpZDogJzQyJyxcbiAgICAgICAgICBzZXF1ZW5jZTogMSxcbiAgICAgICAgICBzaXplOiAyLFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoMCksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0pO1xuICB9KTtcblxuICAvLyBpdCgnZ2V0IGVtcHR5IGV2ZW50IHN0cmVhbScsIGFzeW5jICgpID0+IHtcbiAgLy8gICBjb25zdCBzdHJlYW0gPSBhd2FpdCBzdG9yZS5nZXRFdmVudFN0cmVhbSgpO1xuICAvLyB9KTtcbiAgLy9cbiAgLy8gaXQoJ2dldCBub24tZW1wdHkgZXZlbnQgc3RyZWFtJywgYXN5bmMgKCkgPT4ge1xuICAvLyAgIHN0b3JhZ2UuZ2V0RXZlbnRTdHJlYW0ucmV0dXJucyhQcm9taXNlLnJlc29sdmUoTGlzdChcbiAgLy8gICAgIE1hcCh7XG4gIC8vXG4gIC8vICAgICB9KSwgTWFwKHtcbiAgLy9cbiAgLy8gICAgIH0pKSkpXG4gIC8vIH0pXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
