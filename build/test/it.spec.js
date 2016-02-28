'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _command = require('./account/command/changeEmail/command');

var _command2 = _interopRequireDefault(_command);

var _command3 = require('./account/command/createAccount/command');

var _command4 = _interopRequireDefault(_command3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

describe('Integration Test "Account"', () => {
  let app;

  after(() => {
    if (app) {
      app.terminate();
    }
  });

  it('should load', () => {
    app = require('./main.js').default;
  });

  it('should create account', _asyncToGenerator(function* () {
    const cmd = new _command4.default({
      id: '0',
      givenName: 'Arthur',
      familyName: 'Dent',
      emailAddress: 'arthur@earth.com'
    });

    var _ref = yield app.dispatch(cmd);

    const result = _ref.result;


    _assert2.default.deepEqual(result.toJS(), [{
      aggregate: {
        revision: 0
      },
      command: {
        name: 'CreateAccountCommand',
        id: '0'
      },
      payload: {
        aggregateId: 'TODO',
        givenName: 'Arthur',
        familyName: 'Dent',
        emailAddress: 'arthur@earth.com'
      }
    }]);
  }));

  // it('should handle query', () => {
  //   const { result } = app.dispatch(AccountAccessor, { accountId: '42' });
  //   assert.deepEqual(result, {
  //     name: 'Arthur Dent',
  //     email: 'arthur@earth.com',
  //   });
  // });

  // it('should change email address', async () => {
  //   const cmd = new ChangeEmailCommand({
  //     commandId: '1',
  //     aggregateId: '42',
  //     newEmailAddress: 'arthur@ship.com',
  //   });
  //
  //   const { result } = await app.dispatch(cmd);
  //
  //   assert.deepEqual(result.toJS(), [{
  //     aggregate: {
  //       revision: 0,
  //     },
  //     command: {
  //       name: 'ChangeEmailCommand',
  //       id: '1',
  //     },
  //     payload: {
  //       aggregateId: 'TODO',
  //       newEmailAddress: 'arthur@ship.com',
  //     },
  //   }]);
  // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIml0LnNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsU0FBUyw0QkFBVCxFQUF1QyxNQUFNO0FBQzNDLE1BQUksR0FBSixDQUQyQzs7QUFHM0MsUUFBTSxNQUFNO0FBQ1YsUUFBSSxHQUFKLEVBQVM7QUFDUCxVQUFJLFNBQUosR0FETztLQUFUO0dBREksQ0FBTixDQUgyQzs7QUFTM0MsS0FBRyxhQUFILEVBQWtCLE1BQU07QUFDdEIsVUFBTSxRQUFRLFdBQVIsRUFBcUIsT0FBckIsQ0FEZ0I7R0FBTixDQUFsQixDQVQyQzs7QUFhM0MsS0FBRyx1QkFBSCxvQkFBNEIsYUFBWTtBQUN0QyxVQUFNLE1BQU0sc0JBQXlCO0FBQ25DLFVBQUksR0FBSjtBQUNBLGlCQUFXLFFBQVg7QUFDQSxrQkFBWSxNQUFaO0FBQ0Esb0JBQWMsa0JBQWQ7S0FKVSxDQUFOLENBRGdDOztlQVFuQixNQUFNLElBQUksUUFBSixDQUFhLEdBQWIsQ0FBTixDQVJtQjs7VUFROUIscUJBUjhCOzs7QUFVdEMscUJBQU8sU0FBUCxDQUFpQixPQUFPLElBQVAsRUFBakIsRUFBZ0MsQ0FBQztBQUMvQixpQkFBVztBQUNULGtCQUFVLENBQVY7T0FERjtBQUdBLGVBQVM7QUFDUCxjQUFNLHNCQUFOO0FBQ0EsWUFBSSxHQUFKO09BRkY7QUFJQSxlQUFTO0FBQ1AscUJBQWEsTUFBYjtBQUNBLG1CQUFXLFFBQVg7QUFDQSxvQkFBWSxNQUFaO0FBQ0Esc0JBQWMsa0JBQWQ7T0FKRjtLQVI4QixDQUFoQyxFQVZzQztHQUFaLENBQTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFiMkMsQ0FBTixDQUF2QyIsImZpbGUiOiJpdC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IENoYW5nZUVtYWlsQ29tbWFuZCBmcm9tICcuL2FjY291bnQvY29tbWFuZC9jaGFuZ2VFbWFpbC9jb21tYW5kJztcbmltcG9ydCBDcmVhdGVBY2NvdW50Q29tbWFuZCBmcm9tICcuL2FjY291bnQvY29tbWFuZC9jcmVhdGVBY2NvdW50L2NvbW1hbmQnO1xuXG5cbmRlc2NyaWJlKCdJbnRlZ3JhdGlvbiBUZXN0IFwiQWNjb3VudFwiJywgKCkgPT4ge1xuICBsZXQgYXBwO1xuXG4gIGFmdGVyKCgpID0+IHtcbiAgICBpZiAoYXBwKSB7XG4gICAgICBhcHAudGVybWluYXRlKCk7XG4gICAgfVxuICB9KTtcblxuICBpdCgnc2hvdWxkIGxvYWQnLCAoKSA9PiB7XG4gICAgYXBwID0gcmVxdWlyZSgnLi9tYWluLmpzJykuZGVmYXVsdDtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBjcmVhdGUgYWNjb3VudCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjbWQgPSBuZXcgQ3JlYXRlQWNjb3VudENvbW1hbmQoe1xuICAgICAgaWQ6ICcwJyxcbiAgICAgIGdpdmVuTmFtZTogJ0FydGh1cicsXG4gICAgICBmYW1pbHlOYW1lOiAnRGVudCcsXG4gICAgICBlbWFpbEFkZHJlc3M6ICdhcnRodXJAZWFydGguY29tJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgcmVzdWx0IH0gPSBhd2FpdCBhcHAuZGlzcGF0Y2goY21kKTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LnRvSlMoKSwgW3tcbiAgICAgIGFnZ3JlZ2F0ZToge1xuICAgICAgICByZXZpc2lvbjogMCxcbiAgICAgIH0sXG4gICAgICBjb21tYW5kOiB7XG4gICAgICAgIG5hbWU6ICdDcmVhdGVBY2NvdW50Q29tbWFuZCcsXG4gICAgICAgIGlkOiAnMCcsXG4gICAgICB9LFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBhZ2dyZWdhdGVJZDogJ1RPRE8nLFxuICAgICAgICBnaXZlbk5hbWU6ICdBcnRodXInLFxuICAgICAgICBmYW1pbHlOYW1lOiAnRGVudCcsXG4gICAgICAgIGVtYWlsQWRkcmVzczogJ2FydGh1ckBlYXJ0aC5jb20nLFxuICAgICAgfSxcbiAgICB9XSk7XG4gIH0pO1xuXG4gIC8vIGl0KCdzaG91bGQgaGFuZGxlIHF1ZXJ5JywgKCkgPT4ge1xuICAvLyAgIGNvbnN0IHsgcmVzdWx0IH0gPSBhcHAuZGlzcGF0Y2goQWNjb3VudEFjY2Vzc29yLCB7IGFjY291bnRJZDogJzQyJyB9KTtcbiAgLy8gICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwge1xuICAvLyAgICAgbmFtZTogJ0FydGh1ciBEZW50JyxcbiAgLy8gICAgIGVtYWlsOiAnYXJ0aHVyQGVhcnRoLmNvbScsXG4gIC8vICAgfSk7XG4gIC8vIH0pO1xuXG4gIC8vIGl0KCdzaG91bGQgY2hhbmdlIGVtYWlsIGFkZHJlc3MnLCBhc3luYyAoKSA9PiB7XG4gIC8vICAgY29uc3QgY21kID0gbmV3IENoYW5nZUVtYWlsQ29tbWFuZCh7XG4gIC8vICAgICBjb21tYW5kSWQ6ICcxJyxcbiAgLy8gICAgIGFnZ3JlZ2F0ZUlkOiAnNDInLFxuICAvLyAgICAgbmV3RW1haWxBZGRyZXNzOiAnYXJ0aHVyQHNoaXAuY29tJyxcbiAgLy8gICB9KTtcbiAgLy9cbiAgLy8gICBjb25zdCB7IHJlc3VsdCB9ID0gYXdhaXQgYXBwLmRpc3BhdGNoKGNtZCk7XG4gIC8vXG4gIC8vICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQudG9KUygpLCBbe1xuICAvLyAgICAgYWdncmVnYXRlOiB7XG4gIC8vICAgICAgIHJldmlzaW9uOiAwLFxuICAvLyAgICAgfSxcbiAgLy8gICAgIGNvbW1hbmQ6IHtcbiAgLy8gICAgICAgbmFtZTogJ0NoYW5nZUVtYWlsQ29tbWFuZCcsXG4gIC8vICAgICAgIGlkOiAnMScsXG4gIC8vICAgICB9LFxuICAvLyAgICAgcGF5bG9hZDoge1xuICAvLyAgICAgICBhZ2dyZWdhdGVJZDogJ1RPRE8nLFxuICAvLyAgICAgICBuZXdFbWFpbEFkZHJlc3M6ICdhcnRodXJAc2hpcC5jb20nLFxuICAvLyAgICAgfSxcbiAgLy8gICB9XSk7XG4gIC8vIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
