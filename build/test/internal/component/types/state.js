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
      throw new Error(`invalid state update: must be Immutable.Map`);
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
      throw new Error(`must inherit from 'State'`);
    }
  }
}, _class2.typeName = 'State', _class2.injectTypeWhitelist = [], _temp);
exports.State = State;
exports.StateComponentType = StateComponentType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC90eXBlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFHTSxRQUFOLE1BQU0sS0FBTixDQUFZOztTQUVWLFFBQVEsb0JBQVUsR0FBVjtHQUZFOztBQUlWLFNBQU8sWUFBUCxFQUFxQixFQUFyQixFQUF5Qjs7QUFFdkIsVUFBTSxTQUFTLEdBQUcsS0FBSyxLQUFMLENBQVosQ0FGaUI7QUFHdkIsUUFBSSxFQUFFLGtCQUFrQixvQkFBVSxHQUFWLENBQXBCLEVBQW9DO0FBQ3RDLFlBQU0sSUFBSSxLQUFKLENBQVUsQ0FBQywyQ0FBRCxDQUFWLENBQU4sQ0FEc0M7S0FBeEM7QUFHQSxTQUFLLEtBQUwsR0FBYSxNQUFiLENBTnVCO0dBQXpCOztBQVNBLFFBQU07QUFDSixXQUFPLEtBQUssS0FBTCxDQURIO0dBQU47Q0FiRjtJQW1CTSx3Q0FBTixNQUFNLGtCQUFOLENBQXlCOztBQUt2QixTQUFPLE1BQVAsQ0FBYyxNQUFkLEVBQXNCO0FBQ3BCLFFBQUksRUFBRSxPQUFPLFNBQVAsWUFBNEIsS0FBNUIsQ0FBRixFQUFzQztBQUN4QyxZQUFNLElBQUksS0FBSixDQUFVLENBQUMseUJBQUQsQ0FBVixDQUFOLENBRHdDO0tBQTFDO0dBREY7Q0FMRixVQUVTLFdBQVcsaUJBQ1gsc0JBQXNCO1FBVXRCO1FBQU8iLCJmaWxlIjoiaW50ZXJuYWwvY29tcG9uZW50L3R5cGVzL3N0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuXG5cbmNsYXNzIFN0YXRlIHtcblxuICBfZGF0YSA9IEltbXV0YWJsZS5NYXAoKTtcblxuICB1cGRhdGUoX19kaXNwYXRjaGVyLCBmbikge1xuICAgIC8vIFRPRE86IHZhbGlkYXRlIGl0J3Mgc3RpbGwgYSBNYXAoKVxuICAgIGNvbnN0IHJlc3VsdCA9IGZuKHRoaXMuX2RhdGEpO1xuICAgIGlmICghKHJlc3VsdCBpbnN0YW5jZW9mIEltbXV0YWJsZS5NYXApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgc3RhdGUgdXBkYXRlOiBtdXN0IGJlIEltbXV0YWJsZS5NYXBgKTtcbiAgICB9XG4gICAgdGhpcy5fZGF0YSA9IHJlc3VsdDtcbiAgfVxuXG4gIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxufVxuXG5cbmNsYXNzIFN0YXRlQ29tcG9uZW50VHlwZSB7XG5cbiAgc3RhdGljIHR5cGVOYW1lID0gJ1N0YXRlJztcbiAgc3RhdGljIGluamVjdFR5cGVXaGl0ZWxpc3QgPSBbXTtcblxuICBzdGF0aWMgdmVyaWZ5KHRhcmdldCkge1xuICAgIGlmICghKHRhcmdldC5wcm90b3R5cGUgaW5zdGFuY2VvZiBTdGF0ZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbXVzdCBpbmhlcml0IGZyb20gJ1N0YXRlJ2ApO1xuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCB7IFN0YXRlLCBTdGF0ZUNvbXBvbmVudFR5cGUgfTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
