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


      _assert2.default.throws(() => _accessor2.default.verify(Accessor), err => err.message === `method 'access' must be defined`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC90eXBlcy9hY2Nlc3Nvci5zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBLFNBQVMsdUJBQVQsRUFBa0MsTUFBTTtBQUN0QyxLQUFHLDJDQUFILEVBQWdELE1BQU07QUFDcEQsVUFBTSxlQUFlLG1CQUFzQixtQkFBdEIsQ0FEK0I7O0FBR3BELHFCQUFPLFNBQVAsQ0FBaUIsWUFBakIsRUFBK0IsQ0FBQyxVQUFELEVBQWEsVUFBYixFQUF5QixTQUF6QixFQUFvQyxRQUFwQyxDQUEvQixFQUhvRDtHQUFOLENBQWhELENBRHNDOztBQU90QyxXQUFTLFlBQVQsRUFBdUIsTUFBTTtBQUMzQixPQUFHLGdCQUFILEVBQXFCLE1BQU07VUFDbkIsV0FBTixNQUFNLFFBQU4sQ0FBZTtBQUNiLGVBQU8sTUFBUCxFQUFlO0FBQ2IsNkJBQXNCLE1BQXRCLEdBQStCLE1BQS9CLENBRGE7U0FBZjtPQURGLENBRHlCOzs7QUFPekIseUJBQXNCLE1BQXRCLENBQTZCLFFBQTdCLEVBUHlCO0tBQU4sQ0FBckIsQ0FEMkI7O0FBVzNCLE9BQUcsd0NBQUgsRUFBNkMsTUFBTTtVQUMzQyxXQUFOLE1BQU0sUUFBTixDQUFlLEVBQWYsQ0FEaUQ7OztBQUlqRCx1QkFBTyxNQUFQLENBQ0UsTUFBTSxtQkFBc0IsTUFBdEIsQ0FBNkIsUUFBN0IsQ0FBTixFQUNBLE9BQVMsSUFBSSxPQUFKLEtBQWdCLENBQUMsK0JBQUQsQ0FBaEIsQ0FGWCxDQUppRDtLQUFOLENBQTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWDJCLEdBQU4sQ0FBdkIsQ0FQc0M7Q0FBTixDQUFsQyIsImZpbGUiOiJpbnRlcm5hbC9jb21wb25lbnQvdHlwZXMvYWNjZXNzb3Iuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuaW1wb3J0IEFjY2Vzc29yQ29tcG9uZW50VHlwZSBmcm9tICcuL2FjY2Vzc29yJztcblxuXG5kZXNjcmliZSgnQWNjZXNzb3JDb21wb25lbnRUeXBlJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHdoaXRlbGlzdCBhbGxvd2VkIGluamVjdGFibGUgdHlwZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgYWxsb3dlZFR5cGVzID0gQWNjZXNzb3JDb21wb25lbnRUeXBlLmluamVjdFR5cGVXaGl0ZWxpc3Q7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKGFsbG93ZWRUeXBlcywgWydBY2Nlc3NvcicsICdCZWhhdmlvcicsICdNdXRhdG9yJywgJ1ZpZXdlciddKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3ZhbGlkYXRpb24nLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBzdWNjZWVkJywgKCkgPT4ge1xuICAgICAgY2xhc3MgQWNjZXNzb3Ige1xuICAgICAgICBhY2Nlc3Moc2lnbmFsKSB7XG4gICAgICAgICAgQWNjZXNzb3JDb21wb25lbnRUeXBlLnNpZ25hbCA9IHNpZ25hbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBBY2Nlc3NvckNvbXBvbmVudFR5cGUudmVyaWZ5KEFjY2Vzc29yKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZmFpbCBpZiBcImFjY2Vzc1wiIG1ldGhvZCBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgY2xhc3MgQWNjZXNzb3Ige1xuICAgICAgfVxuXG4gICAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgICAoKSA9PiBBY2Nlc3NvckNvbXBvbmVudFR5cGUudmVyaWZ5KEFjY2Vzc29yKSxcbiAgICAgICAgKGVycikgPT4gZXJyLm1lc3NhZ2UgPT09IGBtZXRob2QgJ2FjY2VzcycgbXVzdCBiZSBkZWZpbmVkYCk7XG4gICAgfSk7XG5cbiAgICAvLyBpdCgnc2hvdWxkIGZhaWwgaWYgXCJhY2Nlc3NcIiBtZXRob2QgaGFzIGxlc3MgdGhhbiAxIHBhcmFtZXRlcicsICgpID0+IHtcbiAgICAvLyAgIGNsYXNzIEFjY2Vzc29yIHtcbiAgICAvLyAgICAgYWNjZXNzKCkge1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy9cbiAgICAvLyAgIGFzc2VydC50aHJvd3MoXG4gICAgLy8gICAgICgpID0+IEFjY2Vzc29yQ29tcG9uZW50VHlwZS52ZXJpZnkoQWNjZXNzb3IpLFxuICAgIC8vICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gYG1ldGhvZCAnYWNjZXNzJyBtdXN0IGhhdmUgZXhhY3RseSAxIHBhcmFtZXRlcmApO1xuICAgIC8vIH0pO1xuICAgIC8vXG4gICAgLy8gaXQoJ3Nob3VsZCBmYWlsIGlmIFwiYWNjZXNzXCIgbWV0aG9kIGhhcyBtb3JlIHRoYW4gMSBwYXJhbWV0ZXInLCAoKSA9PiB7XG4gICAgLy8gICBjbGFzcyBBY2Nlc3NvciB7XG4gICAgLy8gICAgIGFjY2VzcyhvbmUsIHR3bykge1xuICAgIC8vICAgICAgIHRoaXMub25lID0gb25lO1xuICAgIC8vICAgICAgIHRoaXMudHdvID0gdHdvO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy9cbiAgICAvLyAgIGFzc2VydC50aHJvd3MoXG4gICAgLy8gICAgICgpID0+IEFjY2Vzc29yQ29tcG9uZW50VHlwZS52ZXJpZnkoQWNjZXNzb3IpLFxuICAgIC8vICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gYG1ldGhvZCAnYWNjZXNzJyBtdXN0IGhhdmUgZXhhY3RseSAxIHBhcmFtZXRlcmApO1xuICAgIC8vIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
