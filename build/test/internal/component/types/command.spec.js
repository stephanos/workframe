'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('CommandComponentType', () => {
  it('should not allow any injectable types', () => {
    const allowedTypes = _command2.default.injectTypeWhitelist;
    _assert2.default.equal(allowedTypes.length, 0);
  });

  describe('validation', () => {
    it('should succeed', () => {
      let Command = class Command {};


      _command2.default.verify(Command);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC90eXBlcy9jb21tYW5kLnNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBS0EsU0FBUyxzQkFBVCxFQUFpQyxNQUFNO0FBQ3JDLEtBQUcsdUNBQUgsRUFBNEMsTUFBTTtBQUNoRCxVQUFNLGVBQWUsa0JBQXFCLG1CQUFyQixDQUQyQjtBQUVoRCxxQkFBTyxLQUFQLENBQWEsYUFBYSxNQUFiLEVBQXFCLENBQWxDLEVBRmdEO0dBQU4sQ0FBNUMsQ0FEcUM7O0FBTXJDLFdBQVMsWUFBVCxFQUF1QixNQUFNO0FBQzNCLE9BQUcsZ0JBQUgsRUFBcUIsTUFBTTtVQUNuQixVQUFOLE1BQU0sT0FBTixDQUFjLEVBQWQsQ0FEeUI7OztBQUl6Qix3QkFBcUIsTUFBckIsQ0FBNEIsT0FBNUIsRUFKeUI7S0FBTixDQUFyQixDQUQyQjtHQUFOLENBQXZCLENBTnFDO0NBQU4sQ0FBakMiLCJmaWxlIjoiaW50ZXJuYWwvY29tcG9uZW50L3R5cGVzL2NvbW1hbmQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuaW1wb3J0IENvbW1hbmRDb21wb25lbnRUeXBlIGZyb20gJy4vY29tbWFuZCc7XG5cblxuZGVzY3JpYmUoJ0NvbW1hbmRDb21wb25lbnRUeXBlJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIG5vdCBhbGxvdyBhbnkgaW5qZWN0YWJsZSB0eXBlcycsICgpID0+IHtcbiAgICBjb25zdCBhbGxvd2VkVHlwZXMgPSBDb21tYW5kQ29tcG9uZW50VHlwZS5pbmplY3RUeXBlV2hpdGVsaXN0O1xuICAgIGFzc2VydC5lcXVhbChhbGxvd2VkVHlwZXMubGVuZ3RoLCAwKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3ZhbGlkYXRpb24nLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBzdWNjZWVkJywgKCkgPT4ge1xuICAgICAgY2xhc3MgQ29tbWFuZCB7XG4gICAgICB9XG5cbiAgICAgIENvbW1hbmRDb21wb25lbnRUeXBlLnZlcmlmeShDb21tYW5kKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
