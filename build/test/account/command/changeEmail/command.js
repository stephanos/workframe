'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../index');

var _immutable = require('immutable');

let ChangeEmailCommand = class ChangeEmailCommand extends _index.Record.Base {
  constructor(init) {
    super();
    this.__id = init.id;
    this.__aggregateId = init.aggregateId;
    this.__newEmailAddress = init.newEmailAddress;
  }

  get id() {
    return this.__id;
  }

  get aggregateId() {
    return this.__aggregateId;
  }

  get newEmailAddress() {
    return this.__newEmailAddress;
  }

  update(update) {
    return new ChangeEmailCommand({
      id: update.id || this.__id,
      aggregateId: update.aggregateId || this.__aggregateId,
      newEmailAddress: update.newEmailAddress || this.__newEmailAddress
    });
  }

  toMap() {
    return (0, _immutable.Map)({
      id: this.__id,
      aggregateId: this.__aggregateId,
      newEmailAddress: this.__newEmailAddress
    });
  }

};
(0, _index.Record)(module, 'changeEmail', 1)(ChangeEmailCommand);
exports.default = ChangeEmailCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY291bnQvY29tbWFuZC9jaGFuZ2VFbWFpbC9jb21tYW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFNTSxxQkFBTixNQUFNLGtCQUFOLDRCQUF5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQXpCOzJCQURRLGVBQWU7a0JBVVIiLCJmaWxlIjoiYWNjb3VudC9jb21tYW5kL2NoYW5nZUVtYWlsL2NvbW1hbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgeyBSZWNvcmQgfSBmcm9tICcuLi8uLi8uLi9pbmRleCc7XG5cblxuQFJlY29yZCgnY2hhbmdlRW1haWwnLCAxKVxuY2xhc3MgQ2hhbmdlRW1haWxDb21tYW5kIHtcblxuICBpZDogc3RyaW5nO1xuICBhZ2dyZWdhdGVJZDogc3RyaW5nO1xuXG4gIG5ld0VtYWlsQWRkcmVzczogc3RyaW5nO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENoYW5nZUVtYWlsQ29tbWFuZDtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
