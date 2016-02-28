'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../index');

var _immutable = require('immutable');

let AccountAggregateRoot = class AccountAggregateRoot extends _index.Record.Base {
  constructor(init) {
    super();
    this.__id = init.id;
    this.__emailAddress = init.emailAddress;
  }

  get id() {
    return this.__id;
  }

  get emailAddress() {
    return this.__emailAddress;
  }

  update(update) {
    return new AccountAggregateRoot({
      id: update.id || this.__id,
      emailAddress: update.emailAddress || this.__emailAddress
    });
  }

  toMap() {
    return (0, _immutable.Map)({
      id: this.__id,
      emailAddress: this.__emailAddress
    });
  }

};
(0, _index.Record)(module, 'account')(AccountAggregateRoot);
exports.default = AccountAggregateRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY291bnQvY29tbWFuZC9hZ2dyZWdhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQU1NLHVCQUFOLE1BQU0sb0JBQU4sNEJBQTJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUEzQjsyQkFEUTtrQkFRTyIsImZpbGUiOiJhY2NvdW50L2NvbW1hbmQvYWdncmVnYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSAnLi4vLi4vaW5kZXgnO1xuXG5cbkBSZWNvcmQoJ2FjY291bnQnKVxuY2xhc3MgQWNjb3VudEFnZ3JlZ2F0ZVJvb3Qge1xuXG4gIGlkOiBzdHJpbmc7XG4gIGVtYWlsQWRkcmVzczogc3RyaW5nO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFjY291bnRBZ2dyZWdhdGVSb290O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
