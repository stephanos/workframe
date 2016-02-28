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
(0, _index.Record)(module, 'changeEmail')(ChangeEmailCommand);
exports.default = ChangeEmailCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY291bnQvY29tbWFuZC9jaGFuZ2VFbWFpbC9jb21tYW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFNTSxxQkFBTixNQUFNLGtCQUFOLDRCQUF5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQXpCOzJCQURRO2tCQVVPIiwiZmlsZSI6ImFjY291bnQvY29tbWFuZC9jaGFuZ2VFbWFpbC9jb21tYW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSAnLi4vLi4vLi4vaW5kZXgnO1xuXG5cbkBSZWNvcmQoJ2NoYW5nZUVtYWlsJylcbmNsYXNzIENoYW5nZUVtYWlsQ29tbWFuZCB7XG5cbiAgaWQ6IHN0cmluZztcbiAgYWdncmVnYXRlSWQ6IHN0cmluZztcblxuICBuZXdFbWFpbEFkZHJlc3M6IHN0cmluZztcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDaGFuZ2VFbWFpbENvbW1hbmQ7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
