'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _system = require('./system');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SystemComponentType', () => {
  it('should whitelist allowed injectable types', () => {
    const allowedTypes = _system2.default.injectTypeWhitelist;

    _assert2.default.deepEqual(allowedTypes, ['State']);
  });

  describe('validation', () => {
    it('should always succeed', () => {
      let System = class System {};


      _system2.default.verify(System);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC90eXBlcy9zeXN0ZW0uc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFLQSxTQUFTLHFCQUFULEVBQWdDLE1BQU07QUFDcEMsS0FBRywyQ0FBSCxFQUFnRCxNQUFNO0FBQ3BELFVBQU0sZUFBZSxpQkFBb0IsbUJBQXBCLENBRCtCOztBQUdwRCxxQkFBTyxTQUFQLENBQWlCLFlBQWpCLEVBQStCLENBQUMsT0FBRCxDQUEvQixFQUhvRDtHQUFOLENBQWhELENBRG9DOztBQVFwQyxXQUFTLFlBQVQsRUFBdUIsTUFBTTtBQUMzQixPQUFHLHVCQUFILEVBQTRCLE1BQU07VUFDMUIsU0FBTixNQUFNLE1BQU4sQ0FBYSxFQUFiLENBRGdDOzs7QUFJaEMsdUJBQW9CLE1BQXBCLENBQTJCLE1BQTNCLEVBSmdDO0tBQU4sQ0FBNUIsQ0FEMkI7R0FBTixDQUF2QixDQVJvQztDQUFOLENBQWhDIiwiZmlsZSI6ImludGVybmFsL2NvbXBvbmVudC90eXBlcy9zeXN0ZW0uc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuaW1wb3J0IFN5c3RlbUNvbXBvbmVudFR5cGUgZnJvbSAnLi9zeXN0ZW0nO1xuXG5cbmRlc2NyaWJlKCdTeXN0ZW1Db21wb25lbnRUeXBlJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHdoaXRlbGlzdCBhbGxvd2VkIGluamVjdGFibGUgdHlwZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgYWxsb3dlZFR5cGVzID0gU3lzdGVtQ29tcG9uZW50VHlwZS5pbmplY3RUeXBlV2hpdGVsaXN0O1xuXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChhbGxvd2VkVHlwZXMsIFsnU3RhdGUnXSk7XG4gIH0pO1xuXG5cbiAgZGVzY3JpYmUoJ3ZhbGlkYXRpb24nLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBhbHdheXMgc3VjY2VlZCcsICgpID0+IHtcbiAgICAgIGNsYXNzIFN5c3RlbSB7XG4gICAgICB9XG5cbiAgICAgIFN5c3RlbUNvbXBvbmVudFR5cGUudmVyaWZ5KFN5c3RlbSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
