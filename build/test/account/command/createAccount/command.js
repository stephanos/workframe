'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../index');

var _immutable = require('immutable');

let CreateAccountCommand = class CreateAccountCommand extends _index.Record.Base {
  constructor(init) {
    super();
    this.__id = init.id;
    this.__givenName = init.givenName;
    this.__familyName = init.familyName;
    this.__emailAddress = init.emailAddress;
  }

  get id() {
    return this.__id;
  }

  get givenName() {
    return this.__givenName;
  }

  get familyName() {
    return this.__familyName;
  }

  get emailAddress() {
    return this.__emailAddress;
  }

  update(update) {
    return new CreateAccountCommand({
      id: update.id || this.__id,
      givenName: update.givenName || this.__givenName,
      familyName: update.familyName || this.__familyName,
      emailAddress: update.emailAddress || this.__emailAddress
    });
  }

  toMap() {
    return (0, _immutable.Map)({
      id: this.__id,
      givenName: this.__givenName,
      familyName: this.__familyName,
      emailAddress: this.__emailAddress
    });
  }

};
(0, _index.Record)(module, 'createAccount')(CreateAccountCommand);
exports.default = CreateAccountCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY291bnQvY29tbWFuZC9jcmVhdGVBY2NvdW50L2NvbW1hbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQU1NLHVCQUFOLE1BQU0sb0JBQU4sNEJBQTJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQTNCOzJCQURRO2tCQVVPIiwiZmlsZSI6ImFjY291bnQvY29tbWFuZC9jcmVhdGVBY2NvdW50L2NvbW1hbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgeyBSZWNvcmQgfSBmcm9tICcuLi8uLi8uLi9pbmRleCc7XG5cblxuQFJlY29yZCgnY3JlYXRlQWNjb3VudCcpXG5jbGFzcyBDcmVhdGVBY2NvdW50Q29tbWFuZCB7XG5cbiAgaWQ6IHN0cmluZztcbiAgZ2l2ZW5OYW1lOiBzdHJpbmc7XG4gIGZhbWlseU5hbWU6IHN0cmluZztcbiAgZW1haWxBZGRyZXNzOiBzdHJpbmc7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlQWNjb3VudENvbW1hbmQ7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
