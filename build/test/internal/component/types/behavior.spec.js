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


      _assert2.default.throws(() => _behavior2.default.verify(Behavior), err => err.message === `method 'behave' must be defined`);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC90eXBlcy9iZWhhdmlvci5zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBLFNBQVMsdUJBQVQsRUFBa0MsTUFBTTtBQUN0QyxLQUFHLHVDQUFILEVBQTRDLE1BQU07QUFDaEQsVUFBTSxlQUFlLG1CQUFzQixtQkFBdEIsQ0FEMkI7QUFFaEQscUJBQU8sS0FBUCxDQUFhLGFBQWEsTUFBYixFQUFxQixDQUFsQyxFQUZnRDtHQUFOLENBQTVDLENBRHNDOztBQU10QyxXQUFTLFlBQVQsRUFBdUIsTUFBTTtBQUMzQixPQUFHLGdCQUFILEVBQXFCLE1BQU07VUFDbkIsV0FBTixNQUFNLFFBQU4sQ0FBZTtBQUNiLGlCQUFTLEVBQVQ7T0FERixDQUR5Qjs7O0FBTXpCLHlCQUFzQixNQUF0QixDQUE2QixRQUE3QixFQU55QjtLQUFOLENBQXJCLENBRDJCOztBQVUzQixPQUFHLHdDQUFILEVBQTZDLE1BQU07VUFDM0MsV0FBTixNQUFNLFFBQU4sQ0FBZSxFQUFmLENBRGlEOzs7QUFJakQsdUJBQU8sTUFBUCxDQUNFLE1BQU0sbUJBQXNCLE1BQXRCLENBQTZCLFFBQTdCLENBQU4sRUFDQSxPQUFTLElBQUksT0FBSixLQUFnQixDQUFDLCtCQUFELENBQWhCLENBRlgsQ0FKaUQ7S0FBTixDQUE3QyxDQVYyQjtHQUFOLENBQXZCLENBTnNDO0NBQU4sQ0FBbEMiLCJmaWxlIjoiaW50ZXJuYWwvY29tcG9uZW50L3R5cGVzL2JlaGF2aW9yLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5cbmltcG9ydCBCZWhhdmlvckNvbXBvbmVudFR5cGUgZnJvbSAnLi9iZWhhdmlvcic7XG5cblxuZGVzY3JpYmUoJ0JlaGF2aW9yQ29tcG9uZW50VHlwZScsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCBub3QgYWxsb3cgYW55IGluamVjdGFibGUgdHlwZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgYWxsb3dlZFR5cGVzID0gQmVoYXZpb3JDb21wb25lbnRUeXBlLmluamVjdFR5cGVXaGl0ZWxpc3Q7XG4gICAgYXNzZXJ0LmVxdWFsKGFsbG93ZWRUeXBlcy5sZW5ndGgsIDApO1xuICB9KTtcblxuICBkZXNjcmliZSgndmFsaWRhdGlvbicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHN1Y2NlZWQnLCAoKSA9PiB7XG4gICAgICBjbGFzcyBCZWhhdmlvciB7XG4gICAgICAgIGJlaGF2ZSgpIHtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBCZWhhdmlvckNvbXBvbmVudFR5cGUudmVyaWZ5KEJlaGF2aW9yKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZmFpbCBpZiBcImJlaGF2ZVwiIG1ldGhvZCBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgY2xhc3MgQmVoYXZpb3Ige1xuICAgICAgfVxuXG4gICAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgICAoKSA9PiBCZWhhdmlvckNvbXBvbmVudFR5cGUudmVyaWZ5KEJlaGF2aW9yKSxcbiAgICAgICAgKGVycikgPT4gZXJyLm1lc3NhZ2UgPT09IGBtZXRob2QgJ2JlaGF2ZScgbXVzdCBiZSBkZWZpbmVkYCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
