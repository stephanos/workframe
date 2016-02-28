'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _command = require('./account/command/createAccount/command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
// import ChangeEmailCommand from './account/command/changeEmail/command';


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
    const cmd = new _command2.default({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIml0LnNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLFNBQVMsNEJBQVQsRUFBdUMsTUFBTTtBQUMzQyxNQUFJLEdBQUosQ0FEMkM7O0FBRzNDLFFBQU0sTUFBTTtBQUNWLFFBQUksR0FBSixFQUFTO0FBQ1AsVUFBSSxTQUFKLEdBRE87S0FBVDtHQURJLENBQU4sQ0FIMkM7O0FBUzNDLEtBQUcsYUFBSCxFQUFrQixNQUFNO0FBQ3RCLFVBQU0sUUFBUSxXQUFSLEVBQXFCLE9BQXJCLENBRGdCO0dBQU4sQ0FBbEIsQ0FUMkM7O0FBYTNDLEtBQUcsdUJBQUgsb0JBQTRCLGFBQVk7QUFDdEMsVUFBTSxNQUFNLHNCQUF5QjtBQUNuQyxVQUFJLEdBQUo7QUFDQSxpQkFBVyxRQUFYO0FBQ0Esa0JBQVksTUFBWjtBQUNBLG9CQUFjLGtCQUFkO0tBSlUsQ0FBTixDQURnQzs7ZUFRbkIsTUFBTSxJQUFJLFFBQUosQ0FBYSxHQUFiLENBQU4sQ0FSbUI7O1VBUTlCLHFCQVI4Qjs7O0FBVXRDLHFCQUFPLFNBQVAsQ0FBaUIsT0FBTyxJQUFQLEVBQWpCLEVBQWdDLENBQUM7QUFDL0IsaUJBQVc7QUFDVCxrQkFBVSxDQUFWO09BREY7QUFHQSxlQUFTO0FBQ1AsY0FBTSxzQkFBTjtBQUNBLFlBQUksR0FBSjtPQUZGO0FBSUEsZUFBUztBQUNQLHFCQUFhLE1BQWI7QUFDQSxtQkFBVyxRQUFYO0FBQ0Esb0JBQVksTUFBWjtBQUNBLHNCQUFjLGtCQUFkO09BSkY7S0FSOEIsQ0FBaEMsRUFWc0M7R0FBWixDQUE1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYjJDLENBQU4sQ0FBdkMiLCJmaWxlIjoiaXQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0Jztcbi8vIGltcG9ydCBDaGFuZ2VFbWFpbENvbW1hbmQgZnJvbSAnLi9hY2NvdW50L2NvbW1hbmQvY2hhbmdlRW1haWwvY29tbWFuZCc7XG5pbXBvcnQgQ3JlYXRlQWNjb3VudENvbW1hbmQgZnJvbSAnLi9hY2NvdW50L2NvbW1hbmQvY3JlYXRlQWNjb3VudC9jb21tYW5kJztcblxuXG5kZXNjcmliZSgnSW50ZWdyYXRpb24gVGVzdCBcIkFjY291bnRcIicsICgpID0+IHtcbiAgbGV0IGFwcDtcblxuICBhZnRlcigoKSA9PiB7XG4gICAgaWYgKGFwcCkge1xuICAgICAgYXBwLnRlcm1pbmF0ZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBsb2FkJywgKCkgPT4ge1xuICAgIGFwcCA9IHJlcXVpcmUoJy4vbWFpbi5qcycpLmRlZmF1bHQ7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgY3JlYXRlIGFjY291bnQnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY21kID0gbmV3IENyZWF0ZUFjY291bnRDb21tYW5kKHtcbiAgICAgIGlkOiAnMCcsXG4gICAgICBnaXZlbk5hbWU6ICdBcnRodXInLFxuICAgICAgZmFtaWx5TmFtZTogJ0RlbnQnLFxuICAgICAgZW1haWxBZGRyZXNzOiAnYXJ0aHVyQGVhcnRoLmNvbScsXG4gICAgfSk7XG5cbiAgICBjb25zdCB7IHJlc3VsdCB9ID0gYXdhaXQgYXBwLmRpc3BhdGNoKGNtZCk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdC50b0pTKCksIFt7XG4gICAgICBhZ2dyZWdhdGU6IHtcbiAgICAgICAgcmV2aXNpb246IDAsXG4gICAgICB9LFxuICAgICAgY29tbWFuZDoge1xuICAgICAgICBuYW1lOiAnQ3JlYXRlQWNjb3VudENvbW1hbmQnLFxuICAgICAgICBpZDogJzAnLFxuICAgICAgfSxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgYWdncmVnYXRlSWQ6ICdUT0RPJyxcbiAgICAgICAgZ2l2ZW5OYW1lOiAnQXJ0aHVyJyxcbiAgICAgICAgZmFtaWx5TmFtZTogJ0RlbnQnLFxuICAgICAgICBlbWFpbEFkZHJlc3M6ICdhcnRodXJAZWFydGguY29tJyxcbiAgICAgIH0sXG4gICAgfV0pO1xuICB9KTtcblxuICAvLyBpdCgnc2hvdWxkIGhhbmRsZSBxdWVyeScsICgpID0+IHtcbiAgLy8gICBjb25zdCB7IHJlc3VsdCB9ID0gYXBwLmRpc3BhdGNoKEFjY291bnRBY2Nlc3NvciwgeyBhY2NvdW50SWQ6ICc0MicgfSk7XG4gIC8vICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIHtcbiAgLy8gICAgIG5hbWU6ICdBcnRodXIgRGVudCcsXG4gIC8vICAgICBlbWFpbDogJ2FydGh1ckBlYXJ0aC5jb20nLFxuICAvLyAgIH0pO1xuICAvLyB9KTtcblxuICAvLyBpdCgnc2hvdWxkIGNoYW5nZSBlbWFpbCBhZGRyZXNzJywgYXN5bmMgKCkgPT4ge1xuICAvLyAgIGNvbnN0IGNtZCA9IG5ldyBDaGFuZ2VFbWFpbENvbW1hbmQoe1xuICAvLyAgICAgY29tbWFuZElkOiAnMScsXG4gIC8vICAgICBhZ2dyZWdhdGVJZDogJzQyJyxcbiAgLy8gICAgIG5ld0VtYWlsQWRkcmVzczogJ2FydGh1ckBzaGlwLmNvbScsXG4gIC8vICAgfSk7XG4gIC8vXG4gIC8vICAgY29uc3QgeyByZXN1bHQgfSA9IGF3YWl0IGFwcC5kaXNwYXRjaChjbWQpO1xuICAvL1xuICAvLyAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LnRvSlMoKSwgW3tcbiAgLy8gICAgIGFnZ3JlZ2F0ZToge1xuICAvLyAgICAgICByZXZpc2lvbjogMCxcbiAgLy8gICAgIH0sXG4gIC8vICAgICBjb21tYW5kOiB7XG4gIC8vICAgICAgIG5hbWU6ICdDaGFuZ2VFbWFpbENvbW1hbmQnLFxuICAvLyAgICAgICBpZDogJzEnLFxuICAvLyAgICAgfSxcbiAgLy8gICAgIHBheWxvYWQ6IHtcbiAgLy8gICAgICAgYWdncmVnYXRlSWQ6ICdUT0RPJyxcbiAgLy8gICAgICAgbmV3RW1haWxBZGRyZXNzOiAnYXJ0aHVyQHNoaXAuY29tJyxcbiAgLy8gICAgIH0sXG4gIC8vICAgfV0pO1xuICAvLyB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
