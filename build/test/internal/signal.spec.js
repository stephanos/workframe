'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _signal = require('./signal');

var _signal2 = _interopRequireDefault(_signal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Signal', () => {
  it('should be created', () => {
    const actor = {};
    const context = {};
    const model = {};

    const signal = new _signal2.default(actor, context, model);

    _assert2.default.deepEqual(signal.actor, actor);
    _assert2.default.deepEqual(signal.context, context);
    _assert2.default.deepEqual(signal.model, model);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL3NpZ25hbC5zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBLFNBQVMsUUFBVCxFQUFtQixNQUFNO0FBQ3ZCLEtBQUcsbUJBQUgsRUFBd0IsTUFBTTtBQUM1QixVQUFNLFFBQVEsRUFBUixDQURzQjtBQUU1QixVQUFNLFVBQVUsRUFBVixDQUZzQjtBQUc1QixVQUFNLFFBQVEsRUFBUixDQUhzQjs7QUFLNUIsVUFBTSxTQUFTLHFCQUFXLEtBQVgsRUFBa0IsT0FBbEIsRUFBMkIsS0FBM0IsQ0FBVCxDQUxzQjs7QUFPNUIscUJBQU8sU0FBUCxDQUFpQixPQUFPLEtBQVAsRUFBYyxLQUEvQixFQVA0QjtBQVE1QixxQkFBTyxTQUFQLENBQWlCLE9BQU8sT0FBUCxFQUFnQixPQUFqQyxFQVI0QjtBQVM1QixxQkFBTyxTQUFQLENBQWlCLE9BQU8sS0FBUCxFQUFjLEtBQS9CLEVBVDRCO0dBQU4sQ0FBeEIsQ0FEdUI7Q0FBTixDQUFuQiIsImZpbGUiOiJpbnRlcm5hbC9zaWduYWwuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuaW1wb3J0IFNpZ25hbCBmcm9tICcuL3NpZ25hbCc7XG5cblxuZGVzY3JpYmUoJ1NpZ25hbCcsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCBiZSBjcmVhdGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IGFjdG9yID0ge307XG4gICAgY29uc3QgY29udGV4dCA9IHt9O1xuICAgIGNvbnN0IG1vZGVsID0ge307XG5cbiAgICBjb25zdCBzaWduYWwgPSBuZXcgU2lnbmFsKGFjdG9yLCBjb250ZXh0LCBtb2RlbCk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKHNpZ25hbC5hY3RvciwgYWN0b3IpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoc2lnbmFsLmNvbnRleHQsIGNvbnRleHQpO1xuICAgIGFzc2VydC5kZWVwRXF1YWwoc2lnbmFsLm1vZGVsLCBtb2RlbCk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
