'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _behavior = require('./behavior');

var _behavior2 = _interopRequireDefault(_behavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('BehaviorComponentType', () => {
  it('should not allow any injectable types', () => {
    const allowedTypes = _behavior2.default.injectTypeWhitelist;
    _assert2.default.equal(allowedTypes.length, 0);
  });

  describe('validation', () => {
    it('should succeed', () => {
      let Behavior = class Behavior {
        behave() {}
      };


      _behavior2.default.verify(Behavior);
    });

    it('should fail if "behave" method missing', () => {
      let Behavior = class Behavior {};


      _assert2.default.throws(() => _behavior2.default.verify(Behavior), err => err.message === 'method \'behave\' must be defined');
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC90eXBlcy9iZWhhdmlvci5zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBLFNBQVMsdUJBQVQsRUFBa0MsTUFBTTtBQUN0QyxLQUFHLHVDQUFILEVBQTRDLE1BQU07QUFDaEQsVUFBTSxlQUFlLG1CQUFzQixtQkFBdEIsQ0FEMkI7QUFFaEQscUJBQU8sS0FBUCxDQUFhLGFBQWEsTUFBYixFQUFxQixDQUFsQyxFQUZnRDtHQUFOLENBQTVDLENBRHNDOztBQU10QyxXQUFTLFlBQVQsRUFBdUIsTUFBTTtBQUMzQixPQUFHLGdCQUFILEVBQXFCLE1BQU07VUFDbkIsV0FBTixNQUFNLFFBQU4sQ0FBZTtBQUNiLGlCQUFTLEVBQVQ7T0FERixDQUR5Qjs7O0FBTXpCLHlCQUFzQixNQUF0QixDQUE2QixRQUE3QixFQU55QjtLQUFOLENBQXJCLENBRDJCOztBQVUzQixPQUFHLHdDQUFILEVBQTZDLE1BQU07VUFDM0MsV0FBTixNQUFNLFFBQU4sQ0FBZSxFQUFmLENBRGlEOzs7QUFJakQsdUJBQU8sTUFBUCxDQUNFLE1BQU0sbUJBQXNCLE1BQXRCLENBQTZCLFFBQTdCLENBQU4sRUFDQSxPQUFTLElBQUksT0FBSixLQUFnQixtQ0FBaEIsQ0FGWCxDQUppRDtLQUFOLENBQTdDLENBVjJCO0dBQU4sQ0FBdkIsQ0FOc0M7Q0FBTixDQUFsQyIsImZpbGUiOiJpbnRlcm5hbC9jb21wb25lbnQvdHlwZXMvYmVoYXZpb3Iuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuaW1wb3J0IEJlaGF2aW9yQ29tcG9uZW50VHlwZSBmcm9tICcuL2JlaGF2aW9yJztcblxuXG5kZXNjcmliZSgnQmVoYXZpb3JDb21wb25lbnRUeXBlJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIG5vdCBhbGxvdyBhbnkgaW5qZWN0YWJsZSB0eXBlcycsICgpID0+IHtcbiAgICBjb25zdCBhbGxvd2VkVHlwZXMgPSBCZWhhdmlvckNvbXBvbmVudFR5cGUuaW5qZWN0VHlwZVdoaXRlbGlzdDtcbiAgICBhc3NlcnQuZXF1YWwoYWxsb3dlZFR5cGVzLmxlbmd0aCwgMCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd2YWxpZGF0aW9uJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgc3VjY2VlZCcsICgpID0+IHtcbiAgICAgIGNsYXNzIEJlaGF2aW9yIHtcbiAgICAgICAgYmVoYXZlKCkge1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEJlaGF2aW9yQ29tcG9uZW50VHlwZS52ZXJpZnkoQmVoYXZpb3IpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBmYWlsIGlmIFwiYmVoYXZlXCIgbWV0aG9kIG1pc3NpbmcnLCAoKSA9PiB7XG4gICAgICBjbGFzcyBCZWhhdmlvciB7XG4gICAgICB9XG5cbiAgICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAgICgpID0+IEJlaGF2aW9yQ29tcG9uZW50VHlwZS52ZXJpZnkoQmVoYXZpb3IpLFxuICAgICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gJ21ldGhvZCBcXCdiZWhhdmVcXCcgbXVzdCBiZSBkZWZpbmVkJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
