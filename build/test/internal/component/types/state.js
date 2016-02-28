'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateComponentType = exports.State = undefined;

var _class2, _temp;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let State = class State {
  constructor() {
    this._data = _immutable2.default.Map();
  }

  update(__dispatcher, fn) {
    // TODO: validate it's still a Map()
    const result = fn(this._data);
    if (!(result instanceof _immutable2.default.Map)) {
      throw new Error('invalid state update: must be Immutable.Map');
    }
    this._data = result;
  }

  get() {
    return this._data;
  }
};
let StateComponentType = (_temp = _class2 = class StateComponentType {

  static verify(target) {
    if (!(target.prototype instanceof State)) {
      throw new Error('must inherit from \'State\'');
    }
  }
}, _class2.typeName = 'State', _class2.injectTypeWhitelist = [], _temp);
exports.State = State;
exports.StateComponentType = StateComponentType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC90eXBlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFHTSxRQUFOLE1BQU0sS0FBTixDQUFZOztTQUVWLFFBQVEsb0JBQVUsR0FBVjtHQUZFOztBQUlWLFNBQU8sWUFBUCxFQUFxQixFQUFyQixFQUF5Qjs7QUFFdkIsVUFBTSxTQUFTLEdBQUcsS0FBSyxLQUFMLENBQVosQ0FGaUI7QUFHdkIsUUFBSSxFQUFFLGtCQUFrQixvQkFBVSxHQUFWLENBQXBCLEVBQW9DO0FBQ3RDLFlBQU0sSUFBSSxLQUFKLENBQVUsNkNBQVYsQ0FBTixDQURzQztLQUF4QztBQUdBLFNBQUssS0FBTCxHQUFhLE1BQWIsQ0FOdUI7R0FBekI7O0FBU0EsUUFBTTtBQUNKLFdBQU8sS0FBSyxLQUFMLENBREg7R0FBTjtDQWJGO0lBbUJNLHdDQUFOLE1BQU0sa0JBQU4sQ0FBeUI7O0FBS3ZCLFNBQU8sTUFBUCxDQUFjLE1BQWQsRUFBc0I7QUFDcEIsUUFBSSxFQUFFLE9BQU8sU0FBUCxZQUE0QixLQUE1QixDQUFGLEVBQXNDO0FBQ3hDLFlBQU0sSUFBSSxLQUFKLENBQVUsNkJBQVYsQ0FBTixDQUR3QztLQUExQztHQURGO0NBTEYsVUFFUyxXQUFXLGlCQUNYLHNCQUFzQjtRQVV0QjtRQUFPIiwiZmlsZSI6ImludGVybmFsL2NvbXBvbmVudC90eXBlcy9zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJztcblxuXG5jbGFzcyBTdGF0ZSB7XG5cbiAgX2RhdGEgPSBJbW11dGFibGUuTWFwKCk7XG5cbiAgdXBkYXRlKF9fZGlzcGF0Y2hlciwgZm4pIHtcbiAgICAvLyBUT0RPOiB2YWxpZGF0ZSBpdCdzIHN0aWxsIGEgTWFwKClcbiAgICBjb25zdCByZXN1bHQgPSBmbih0aGlzLl9kYXRhKTtcbiAgICBpZiAoIShyZXN1bHQgaW5zdGFuY2VvZiBJbW11dGFibGUuTWFwKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHN0YXRlIHVwZGF0ZTogbXVzdCBiZSBJbW11dGFibGUuTWFwJyk7XG4gICAgfVxuICAgIHRoaXMuX2RhdGEgPSByZXN1bHQ7XG4gIH1cblxuICBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cbn1cblxuXG5jbGFzcyBTdGF0ZUNvbXBvbmVudFR5cGUge1xuXG4gIHN0YXRpYyB0eXBlTmFtZSA9ICdTdGF0ZSc7XG4gIHN0YXRpYyBpbmplY3RUeXBlV2hpdGVsaXN0ID0gW107XG5cbiAgc3RhdGljIHZlcmlmeSh0YXJnZXQpIHtcbiAgICBpZiAoISh0YXJnZXQucHJvdG90eXBlIGluc3RhbmNlb2YgU3RhdGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ211c3QgaW5oZXJpdCBmcm9tIFxcJ1N0YXRlXFwnJyk7XG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IHsgU3RhdGUsIFN0YXRlQ29tcG9uZW50VHlwZSB9O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
