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


      _assert2.default.throws(() => _state.StateComponentType.verify(MyState), err => err.message === 'must inherit from \'State\'');
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

    _assert2.default.throws(() => state.update(null, () => undefined), err => err.message === 'invalid state update: must be Immutable.Map');
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC90eXBlcy9zdGF0ZS5zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBTUEsU0FBUyxvQkFBVCxFQUErQixNQUFNO0FBQ25DLEtBQUcsdUNBQUgsRUFBNEMsTUFBTTtBQUNoRCxVQUFNLGVBQWUsMEJBQW1CLG1CQUFuQixDQUQyQjtBQUVoRCxxQkFBTyxLQUFQLENBQWEsYUFBYSxNQUFiLEVBQXFCLENBQWxDLEVBRmdEO0dBQU4sQ0FBNUMsQ0FEbUM7O0FBTW5DLFdBQVMsWUFBVCxFQUF1QixNQUFNO0FBQzNCLE9BQUcscUNBQUgsRUFBMEMsTUFBTTtVQUN4QyxVQUFOLE1BQU0sT0FBTixzQkFBNEIsRUFBNUIsQ0FEOEM7OztBQUk5QyxnQ0FBbUIsTUFBbkIsQ0FBMEIsT0FBMUIsRUFKOEM7S0FBTixDQUExQyxDQUQyQjs7QUFRM0IsT0FBRyxzQ0FBSCxFQUEyQyxNQUFNO1VBQ3pDLFVBQU4sTUFBTSxPQUFOLENBQWMsRUFBZCxDQUQrQzs7O0FBSS9DLHVCQUFPLE1BQVAsQ0FDRSxNQUFNLDBCQUFtQixNQUFuQixDQUEwQixPQUExQixDQUFOLEVBQ0EsT0FBUyxJQUFJLE9BQUosS0FBZ0IsNkJBQWhCLENBRlgsQ0FKK0M7S0FBTixDQUEzQyxDQVIyQjtHQUFOLENBQXZCLENBTm1DO0NBQU4sQ0FBL0I7O0FBMEJBLFNBQVMsT0FBVCxFQUFrQixNQUFNO0FBQ3RCLFdBQVMsb0JBQVQsRUFBK0IsTUFBTTtBQUNuQyxPQUFHLHlCQUFILEVBQThCLE1BQU07QUFDbEMsWUFBTSxRQUFRLGtCQUFSLENBRDRCOztBQUdsQyx1QkFBTyxTQUFQLENBQWlCLE1BQU0sR0FBTixFQUFqQixFQUE4QixvQkFBVSxHQUFWLEVBQTlCLEVBSGtDO0tBQU4sQ0FBOUIsQ0FEbUM7R0FBTixDQUEvQixDQURzQjs7QUFTdEIsS0FBRyxlQUFILEVBQW9CLE1BQU07QUFDeEIsVUFBTSxRQUFRLGtCQUFSLENBRGtCOztBQUd4QixVQUFNLE1BQU4sQ0FBYSxJQUFiLEVBQW1CLE9BQVMsSUFBSSxHQUFKLENBQVEsS0FBUixFQUFlLE9BQWYsQ0FBVCxDQUFuQixDQUh3Qjs7QUFLeEIscUJBQU8sU0FBUCxDQUFpQixNQUFNLEdBQU4sR0FBWSxJQUFaLEVBQWpCLEVBQXFDLG9CQUFVLEdBQVYsQ0FBYyxFQUFFLEtBQUssT0FBTCxFQUFoQixFQUFnQyxJQUFoQyxFQUFyQyxFQUx3QjtHQUFOLENBQXBCLENBVHNCOztBQWlCdEIsS0FBRyx5Q0FBSCxFQUE4QyxNQUFNO0FBQ2xELFVBQU0sUUFBUSxrQkFBUixDQUQ0Qzs7QUFHbEQscUJBQU8sTUFBUCxDQUNFLE1BQU0sTUFBTSxNQUFOLENBQWEsSUFBYixFQUFtQixNQUFNLFNBQU4sQ0FBekIsRUFDQSxPQUFTLElBQUksT0FBSixLQUFnQiw2Q0FBaEIsQ0FGWCxDQUhrRDtHQUFOLENBQTlDLENBakJzQjtDQUFOLENBQWxCIiwiZmlsZSI6ImludGVybmFsL2NvbXBvbmVudC90eXBlcy9zdGF0ZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuXG5pbXBvcnQgeyBTdGF0ZSwgU3RhdGVDb21wb25lbnRUeXBlIH0gZnJvbSAnLi9zdGF0ZSc7XG5cblxuZGVzY3JpYmUoJ1N0YXRlQ29tcG9uZW50VHlwZScsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCBub3QgYWxsb3cgYW55IGluamVjdGFibGUgdHlwZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgYWxsb3dlZFR5cGVzID0gU3RhdGVDb21wb25lbnRUeXBlLmluamVjdFR5cGVXaGl0ZWxpc3Q7XG4gICAgYXNzZXJ0LmVxdWFsKGFsbG93ZWRUeXBlcy5sZW5ndGgsIDApO1xuICB9KTtcblxuICBkZXNjcmliZSgndmFsaWRhdGlvbicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgd2hlbiB0eXBlIG9mIFwiU3RhdGVcIicsICgpID0+IHtcbiAgICAgIGNsYXNzIE15U3RhdGUgZXh0ZW5kcyBTdGF0ZSB7XG4gICAgICB9XG5cbiAgICAgIFN0YXRlQ29tcG9uZW50VHlwZS52ZXJpZnkoTXlTdGF0ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBub3QgdHlwZSBvZiBcIlN0YXRlXCInLCAoKSA9PiB7XG4gICAgICBjbGFzcyBNeVN0YXRlIHtcbiAgICAgIH1cblxuICAgICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICAgKCkgPT4gU3RhdGVDb21wb25lbnRUeXBlLnZlcmlmeShNeVN0YXRlKSxcbiAgICAgICAgKGVycikgPT4gZXJyLm1lc3NhZ2UgPT09ICdtdXN0IGluaGVyaXQgZnJvbSBcXCdTdGF0ZVxcJycpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5cbmRlc2NyaWJlKCdTdGF0ZScsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2FmdGVyIGNvbnN0cnVjdGlvbicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBlbXB0eSBNYXAnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IG5ldyBTdGF0ZSgpO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHN0YXRlLmdldCgpLCBJbW11dGFibGUuTWFwKCkpO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHVwZGF0ZScsICgpID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IG5ldyBTdGF0ZSgpO1xuXG4gICAgc3RhdGUudXBkYXRlKG51bGwsIChtYXApID0+IG1hcC5zZXQoJ2tleScsICd2YWx1ZScpKTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwoc3RhdGUuZ2V0KCkudG9KUygpLCBJbW11dGFibGUuTWFwKHsga2V5OiAndmFsdWUnIH0pLnRvSlMoKSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZmFpbCB0byB1cGRhdGUgZm9yIGludmFsaWQgdmFsdWUnLCAoKSA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSBuZXcgU3RhdGUoKTtcblxuICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAoKSA9PiBzdGF0ZS51cGRhdGUobnVsbCwgKCkgPT4gdW5kZWZpbmVkKSxcbiAgICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSAnaW52YWxpZCBzdGF0ZSB1cGRhdGU6IG11c3QgYmUgSW1tdXRhYmxlLk1hcCcpO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
