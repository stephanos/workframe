'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../index');

var _immutable = require('immutable');

let AccountCreatedEvent = class AccountCreatedEvent extends _index.Record.Base {
  constructor(init) {
    super();
    this.__aggregateId = init.aggregateId;
    this.__givenName = init.givenName;
    this.__familyName = init.familyName;
    this.__emailAddress = init.emailAddress;
  }

  get aggregateId() {
    return this.__aggregateId;
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
    return new AccountCreatedEvent({
      aggregateId: update.aggregateId || this.__aggregateId,
      givenName: update.givenName || this.__givenName,
      familyName: update.familyName || this.__familyName,
      emailAddress: update.emailAddress || this.__emailAddress
    });
  }

  toMap() {
    return (0, _immutable.Map)({
      aggregateId: this.__aggregateId,
      givenName: this.__givenName,
      familyName: this.__familyName,
      emailAddress: this.__emailAddress
    });
  }

};
(0, _index.Record)(module, 'accountCreated')(AccountCreatedEvent);
exports.default = AccountCreatedEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY291bnQvZXZlbnQvYWNjb3VudENyZWF0ZWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQU1NLHNCQUFOLE1BQU0sbUJBQU4sNEJBQTBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQTFCOzJCQURRO2tCQVdPIiwiZmlsZSI6ImFjY291bnQvZXZlbnQvYWNjb3VudENyZWF0ZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgeyBSZWNvcmQgfSBmcm9tICcuLi8uLi9pbmRleCc7XG5cblxuQFJlY29yZCgnYWNjb3VudENyZWF0ZWQnKVxuY2xhc3MgQWNjb3VudENyZWF0ZWRFdmVudCB7XG5cbiAgYWdncmVnYXRlSWQ6IHN0cmluZztcblxuICBnaXZlbk5hbWU6IHN0cmluZztcbiAgZmFtaWx5TmFtZTogc3RyaW5nO1xuICBlbWFpbEFkZHJlc3M6IHN0cmluZztcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50Q3JlYXRlZEV2ZW50O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
