'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _state = require('./state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('StateComponentType', () => {
  it('should not allow any injectable types', () => {
    const allowedTypes = _state.StateComponentType.injectTypeWhitelist;
    _assert2.default.equal(allowedTypes.length, 0);
  });

  describe('validation', () => {
    it('should succeed when type of "State"', () => {
      let MyState = class MyState extends _state.State {};


      _state.StateComponentType.verify(MyState);
    });

    it('should fail when not type of "State"', () => {
      let MyState = class MyState {};


      _assert2.default.throws(() => _state.StateComponentType.verify(MyState), err => err.message === `must inherit from 'State'`);
    });
  });
});

describe('State', () => {
  describe('after construction', () => {
    it('should return empty Map', () => {
      const state = new _state.State();

      _assert2.default.deepEqual(state.get(), _immutable2.default.Map());
    });
  });

  it('should update', () => {
    const state = new _state.State();

    state.update(null, map => map.set('key', 'value'));

    _assert2.default.deepEqual(state.get().toJS(), _immutable2.default.Map({ key: 'value' }).toJS());
  });

  it('should fail to update for invalid value', () => {
    const state = new _state.State();

    _assert2.default.throws(() => state.update(null, () => undefined), err => err.message === `invalid state update: must be Immutable.Map`);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC90eXBlcy9zdGF0ZS5zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBTUEsU0FBUyxvQkFBVCxFQUErQixNQUFNO0FBQ25DLEtBQUcsdUNBQUgsRUFBNEMsTUFBTTtBQUNoRCxVQUFNLGVBQWUsMEJBQW1CLG1CQUFuQixDQUQyQjtBQUVoRCxxQkFBTyxLQUFQLENBQWEsYUFBYSxNQUFiLEVBQXFCLENBQWxDLEVBRmdEO0dBQU4sQ0FBNUMsQ0FEbUM7O0FBTW5DLFdBQVMsWUFBVCxFQUF1QixNQUFNO0FBQzNCLE9BQUcscUNBQUgsRUFBMEMsTUFBTTtVQUN4QyxVQUFOLE1BQU0sT0FBTixzQkFBNEIsRUFBNUIsQ0FEOEM7OztBQUk5QyxnQ0FBbUIsTUFBbkIsQ0FBMEIsT0FBMUIsRUFKOEM7S0FBTixDQUExQyxDQUQyQjs7QUFRM0IsT0FBRyxzQ0FBSCxFQUEyQyxNQUFNO1VBQ3pDLFVBQU4sTUFBTSxPQUFOLENBQWMsRUFBZCxDQUQrQzs7O0FBSS9DLHVCQUFPLE1BQVAsQ0FDRSxNQUFNLDBCQUFtQixNQUFuQixDQUEwQixPQUExQixDQUFOLEVBQ0EsT0FBUyxJQUFJLE9BQUosS0FBZ0IsQ0FBQyx5QkFBRCxDQUFoQixDQUZYLENBSitDO0tBQU4sQ0FBM0MsQ0FSMkI7R0FBTixDQUF2QixDQU5tQztDQUFOLENBQS9COztBQTBCQSxTQUFTLE9BQVQsRUFBa0IsTUFBTTtBQUN0QixXQUFTLG9CQUFULEVBQStCLE1BQU07QUFDbkMsT0FBRyx5QkFBSCxFQUE4QixNQUFNO0FBQ2xDLFlBQU0sUUFBUSxrQkFBUixDQUQ0Qjs7QUFHbEMsdUJBQU8sU0FBUCxDQUFpQixNQUFNLEdBQU4sRUFBakIsRUFBOEIsb0JBQVUsR0FBVixFQUE5QixFQUhrQztLQUFOLENBQTlCLENBRG1DO0dBQU4sQ0FBL0IsQ0FEc0I7O0FBU3RCLEtBQUcsZUFBSCxFQUFvQixNQUFNO0FBQ3hCLFVBQU0sUUFBUSxrQkFBUixDQURrQjs7QUFHeEIsVUFBTSxNQUFOLENBQWEsSUFBYixFQUFtQixPQUFTLElBQUksR0FBSixDQUFRLEtBQVIsRUFBZSxPQUFmLENBQVQsQ0FBbkIsQ0FId0I7O0FBS3hCLHFCQUFPLFNBQVAsQ0FBaUIsTUFBTSxHQUFOLEdBQVksSUFBWixFQUFqQixFQUFxQyxvQkFBVSxHQUFWLENBQWMsRUFBRSxLQUFLLE9BQUwsRUFBaEIsRUFBZ0MsSUFBaEMsRUFBckMsRUFMd0I7R0FBTixDQUFwQixDQVRzQjs7QUFpQnRCLEtBQUcseUNBQUgsRUFBOEMsTUFBTTtBQUNsRCxVQUFNLFFBQVEsa0JBQVIsQ0FENEM7O0FBR2xELHFCQUFPLE1BQVAsQ0FDRSxNQUFNLE1BQU0sTUFBTixDQUFhLElBQWIsRUFBbUIsTUFBTSxTQUFOLENBQXpCLEVBQ0EsT0FBUyxJQUFJLE9BQUosS0FBZ0IsQ0FBQywyQ0FBRCxDQUFoQixDQUZYLENBSGtEO0dBQU4sQ0FBOUMsQ0FqQnNCO0NBQU4sQ0FBbEIiLCJmaWxlIjoiaW50ZXJuYWwvY29tcG9uZW50L3R5cGVzL3N0YXRlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCB7IFN0YXRlLCBTdGF0ZUNvbXBvbmVudFR5cGUgfSBmcm9tICcuL3N0YXRlJztcblxuXG5kZXNjcmliZSgnU3RhdGVDb21wb25lbnRUeXBlJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIG5vdCBhbGxvdyBhbnkgaW5qZWN0YWJsZSB0eXBlcycsICgpID0+IHtcbiAgICBjb25zdCBhbGxvd2VkVHlwZXMgPSBTdGF0ZUNvbXBvbmVudFR5cGUuaW5qZWN0VHlwZVdoaXRlbGlzdDtcbiAgICBhc3NlcnQuZXF1YWwoYWxsb3dlZFR5cGVzLmxlbmd0aCwgMCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd2YWxpZGF0aW9uJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aGVuIHR5cGUgb2YgXCJTdGF0ZVwiJywgKCkgPT4ge1xuICAgICAgY2xhc3MgTXlTdGF0ZSBleHRlbmRzIFN0YXRlIHtcbiAgICAgIH1cblxuICAgICAgU3RhdGVDb21wb25lbnRUeXBlLnZlcmlmeShNeVN0YXRlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZmFpbCB3aGVuIG5vdCB0eXBlIG9mIFwiU3RhdGVcIicsICgpID0+IHtcbiAgICAgIGNsYXNzIE15U3RhdGUge1xuICAgICAgfVxuXG4gICAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgICAoKSA9PiBTdGF0ZUNvbXBvbmVudFR5cGUudmVyaWZ5KE15U3RhdGUpLFxuICAgICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gYG11c3QgaW5oZXJpdCBmcm9tICdTdGF0ZSdgKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuXG5kZXNjcmliZSgnU3RhdGUnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdhZnRlciBjb25zdHJ1Y3Rpb24nLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZW1wdHkgTWFwJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBuZXcgU3RhdGUoKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChzdGF0ZS5nZXQoKSwgSW1tdXRhYmxlLk1hcCgpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCB1cGRhdGUnLCAoKSA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSBuZXcgU3RhdGUoKTtcblxuICAgIHN0YXRlLnVwZGF0ZShudWxsLCAobWFwKSA9PiBtYXAuc2V0KCdrZXknLCAndmFsdWUnKSk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKHN0YXRlLmdldCgpLnRvSlMoKSwgSW1tdXRhYmxlLk1hcCh7IGtleTogJ3ZhbHVlJyB9KS50b0pTKCkpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGZhaWwgdG8gdXBkYXRlIGZvciBpbnZhbGlkIHZhbHVlJywgKCkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gbmV3IFN0YXRlKCk7XG5cbiAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgKCkgPT4gc3RhdGUudXBkYXRlKG51bGwsICgpID0+IHVuZGVmaW5lZCksXG4gICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gYGludmFsaWQgc3RhdGUgdXBkYXRlOiBtdXN0IGJlIEltbXV0YWJsZS5NYXBgKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
