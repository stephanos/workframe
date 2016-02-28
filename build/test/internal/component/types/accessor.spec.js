'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _accessor = require('./accessor');

var _accessor2 = _interopRequireDefault(_accessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('AccessorComponentType', () => {
  it('should whitelist allowed injectable types', () => {
    const allowedTypes = _accessor2.default.injectTypeWhitelist;

    _assert2.default.deepEqual(allowedTypes, ['Accessor', 'Behavior', 'Mutator', 'Viewer']);
  });

  describe('validation', () => {
    it('should succeed', () => {
      let Accessor = class Accessor {
        access(signal) {
          _accessor2.default.signal = signal;
        }
      };


      _accessor2.default.verify(Accessor);
    });

    it('should fail if "access" method missing', () => {
      let Accessor = class Accessor {};


      _assert2.default.throws(() => _accessor2.default.verify(Accessor), err => err.message === 'method \'access\' must be defined');
    });

    // it('should fail if "access" method has less than 1 parameter', () => {
    //   class Accessor {
    //     access() {
    //     }
    //   }
    //
    //   assert.throws(
    //     () => AccessorComponentType.verify(Accessor),
    //     (err) => err.message === `method 'access' must have exactly 1 parameter`);
    // });
    //
    // it('should fail if "access" method has more than 1 parameter', () => {
    //   class Accessor {
    //     access(one, two) {
    //       this.one = one;
    //       this.two = two;
    //     }
    //   }
    //
    //   assert.throws(
    //     () => AccessorComponentType.verify(Accessor),
    //     (err) => err.message === `method 'access' must have exactly 1 parameter`);
    // });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC90eXBlcy9hY2Nlc3Nvci5zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBLFNBQVMsdUJBQVQsRUFBa0MsTUFBTTtBQUN0QyxLQUFHLDJDQUFILEVBQWdELE1BQU07QUFDcEQsVUFBTSxlQUFlLG1CQUFzQixtQkFBdEIsQ0FEK0I7O0FBR3BELHFCQUFPLFNBQVAsQ0FBaUIsWUFBakIsRUFBK0IsQ0FBQyxVQUFELEVBQWEsVUFBYixFQUF5QixTQUF6QixFQUFvQyxRQUFwQyxDQUEvQixFQUhvRDtHQUFOLENBQWhELENBRHNDOztBQU90QyxXQUFTLFlBQVQsRUFBdUIsTUFBTTtBQUMzQixPQUFHLGdCQUFILEVBQXFCLE1BQU07VUFDbkIsV0FBTixNQUFNLFFBQU4sQ0FBZTtBQUNiLGVBQU8sTUFBUCxFQUFlO0FBQ2IsNkJBQXNCLE1BQXRCLEdBQStCLE1BQS9CLENBRGE7U0FBZjtPQURGLENBRHlCOzs7QUFPekIseUJBQXNCLE1BQXRCLENBQTZCLFFBQTdCLEVBUHlCO0tBQU4sQ0FBckIsQ0FEMkI7O0FBVzNCLE9BQUcsd0NBQUgsRUFBNkMsTUFBTTtVQUMzQyxXQUFOLE1BQU0sUUFBTixDQUFlLEVBQWYsQ0FEaUQ7OztBQUlqRCx1QkFBTyxNQUFQLENBQ0UsTUFBTSxtQkFBc0IsTUFBdEIsQ0FBNkIsUUFBN0IsQ0FBTixFQUNBLE9BQVMsSUFBSSxPQUFKLEtBQWdCLG1DQUFoQixDQUZYLENBSmlEO0tBQU4sQ0FBN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFYMkIsR0FBTixDQUF2QixDQVBzQztDQUFOLENBQWxDIiwiZmlsZSI6ImludGVybmFsL2NvbXBvbmVudC90eXBlcy9hY2Nlc3Nvci5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuXG5pbXBvcnQgQWNjZXNzb3JDb21wb25lbnRUeXBlIGZyb20gJy4vYWNjZXNzb3InO1xuXG5cbmRlc2NyaWJlKCdBY2Nlc3NvckNvbXBvbmVudFR5cGUnLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgd2hpdGVsaXN0IGFsbG93ZWQgaW5qZWN0YWJsZSB0eXBlcycsICgpID0+IHtcbiAgICBjb25zdCBhbGxvd2VkVHlwZXMgPSBBY2Nlc3NvckNvbXBvbmVudFR5cGUuaW5qZWN0VHlwZVdoaXRlbGlzdDtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwoYWxsb3dlZFR5cGVzLCBbJ0FjY2Vzc29yJywgJ0JlaGF2aW9yJywgJ011dGF0b3InLCAnVmlld2VyJ10pO1xuICB9KTtcblxuICBkZXNjcmliZSgndmFsaWRhdGlvbicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHN1Y2NlZWQnLCAoKSA9PiB7XG4gICAgICBjbGFzcyBBY2Nlc3NvciB7XG4gICAgICAgIGFjY2VzcyhzaWduYWwpIHtcbiAgICAgICAgICBBY2Nlc3NvckNvbXBvbmVudFR5cGUuc2lnbmFsID0gc2lnbmFsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEFjY2Vzc29yQ29tcG9uZW50VHlwZS52ZXJpZnkoQWNjZXNzb3IpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBmYWlsIGlmIFwiYWNjZXNzXCIgbWV0aG9kIG1pc3NpbmcnLCAoKSA9PiB7XG4gICAgICBjbGFzcyBBY2Nlc3NvciB7XG4gICAgICB9XG5cbiAgICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAgICgpID0+IEFjY2Vzc29yQ29tcG9uZW50VHlwZS52ZXJpZnkoQWNjZXNzb3IpLFxuICAgICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gJ21ldGhvZCBcXCdhY2Nlc3NcXCcgbXVzdCBiZSBkZWZpbmVkJyk7XG4gICAgfSk7XG5cbiAgICAvLyBpdCgnc2hvdWxkIGZhaWwgaWYgXCJhY2Nlc3NcIiBtZXRob2QgaGFzIGxlc3MgdGhhbiAxIHBhcmFtZXRlcicsICgpID0+IHtcbiAgICAvLyAgIGNsYXNzIEFjY2Vzc29yIHtcbiAgICAvLyAgICAgYWNjZXNzKCkge1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy9cbiAgICAvLyAgIGFzc2VydC50aHJvd3MoXG4gICAgLy8gICAgICgpID0+IEFjY2Vzc29yQ29tcG9uZW50VHlwZS52ZXJpZnkoQWNjZXNzb3IpLFxuICAgIC8vICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gYG1ldGhvZCAnYWNjZXNzJyBtdXN0IGhhdmUgZXhhY3RseSAxIHBhcmFtZXRlcmApO1xuICAgIC8vIH0pO1xuICAgIC8vXG4gICAgLy8gaXQoJ3Nob3VsZCBmYWlsIGlmIFwiYWNjZXNzXCIgbWV0aG9kIGhhcyBtb3JlIHRoYW4gMSBwYXJhbWV0ZXInLCAoKSA9PiB7XG4gICAgLy8gICBjbGFzcyBBY2Nlc3NvciB7XG4gICAgLy8gICAgIGFjY2VzcyhvbmUsIHR3bykge1xuICAgIC8vICAgICAgIHRoaXMub25lID0gb25lO1xuICAgIC8vICAgICAgIHRoaXMudHdvID0gdHdvO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy9cbiAgICAvLyAgIGFzc2VydC50aHJvd3MoXG4gICAgLy8gICAgICgpID0+IEFjY2Vzc29yQ29tcG9uZW50VHlwZS52ZXJpZnkoQWNjZXNzb3IpLFxuICAgIC8vICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gYG1ldGhvZCAnYWNjZXNzJyBtdXN0IGhhdmUgZXhhY3RseSAxIHBhcmFtZXRlcmApO1xuICAgIC8vIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
