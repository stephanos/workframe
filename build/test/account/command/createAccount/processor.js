'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _class;

var _index = require('../../../index');

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

var _aggregate = require('../aggregate');

var _aggregate2 = _interopRequireDefault(_aggregate);

var _accountCreated = require('../../event/accountCreated');

var _accountCreated2 = _interopRequireDefault(_accountCreated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

let CreateAccountProcessor = (_dec = (0, _index.Component)(module, _command2.default), _dec(_class = class CreateAccountProcessor {

  process(__dispatcher, aggregate, command) {
    return _asyncToGenerator(function* () {
      // TODO: email already used?
      // TODO: aggregate already exists?

      return new _accountCreated2.default({
        aggregateId: 'TODO',
        givenName: command.givenName,
        familyName: command.familyName,
        emailAddress: command.emailAddress
      });
    })();
  }
}) || _class);
exports.default = CreateAccountProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY291bnQvY29tbWFuZC9jcmVhdGVBY2NvdW50L3Byb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVNNLGlDQURMLGdFQUNELE1BQU0sc0JBQU4sQ0FBNkI7O0FBRTNCLHdCQUFjLFNBQWQsRUFDYyxPQURkLEVBQzJFOzs7OztBQUl6RSxhQUFPLDZCQUF3QjtBQUM3QixxQkFBYSxNQUFiO0FBQ0EsbUJBQVcsUUFBUSxTQUFSO0FBQ1gsb0JBQVksUUFBUSxVQUFSO0FBQ1osc0JBQWMsUUFBUSxZQUFSO09BSlQsQ0FBUDtTQUp5RTtHQUQzRTtDQUZGO2tCQWlCZSIsImZpbGUiOiJhY2NvdW50L2NvbW1hbmQvY3JlYXRlQWNjb3VudC9wcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9pbmRleCc7XG5pbXBvcnQgQ3JlYXRlQWNjb3VudENvbW1hbmQgZnJvbSAnLi9jb21tYW5kJztcbmltcG9ydCBBY2NvdW50QWdncmVnYXRlUm9vdCBmcm9tICcuLi9hZ2dyZWdhdGUnO1xuaW1wb3J0IEFjY291bnRDcmVhdGVkRXZlbnQgZnJvbSAnLi4vLi4vZXZlbnQvYWNjb3VudENyZWF0ZWQnO1xuXG5cbkBDb21wb25lbnQoQ3JlYXRlQWNjb3VudENvbW1hbmQpXG5jbGFzcyBDcmVhdGVBY2NvdW50UHJvY2Vzc29yIHtcblxuICBhc3luYyBwcm9jZXNzKGFnZ3JlZ2F0ZTogQWNjb3VudEFnZ3JlZ2F0ZVJvb3QsXG4gICAgICAgICAgICAgICAgY29tbWFuZDogQ3JlYXRlQWNjb3VudENvbW1hbmQpOiBQcm9taXNlPEFjY291bnRDcmVhdGVkRXZlbnQ+IHtcbiAgICAvLyBUT0RPOiBlbWFpbCBhbHJlYWR5IHVzZWQ/XG4gICAgLy8gVE9ETzogYWdncmVnYXRlIGFscmVhZHkgZXhpc3RzP1xuXG4gICAgcmV0dXJuIG5ldyBBY2NvdW50Q3JlYXRlZEV2ZW50KHtcbiAgICAgIGFnZ3JlZ2F0ZUlkOiAnVE9ETycsXG4gICAgICBnaXZlbk5hbWU6IGNvbW1hbmQuZ2l2ZW5OYW1lLFxuICAgICAgZmFtaWx5TmFtZTogY29tbWFuZC5mYW1pbHlOYW1lLFxuICAgICAgZW1haWxBZGRyZXNzOiBjb21tYW5kLmVtYWlsQWRkcmVzcyxcbiAgICB9KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENyZWF0ZUFjY291bnRQcm9jZXNzb3I7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
