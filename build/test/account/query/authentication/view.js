'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../index');

var _immutable = require('immutable');

let AccountAuthenticationView = class AccountAuthenticationView extends _index.Record.Base {
  constructor(init) {
    super();
    this.__id = init.id;
    this.__accountId = init.accountId;
    this.__passwordHash = init.passwordHash;
  }

  get id() {
    return this.__id;
  }

  get accountId() {
    return this.__accountId;
  }

  get passwordHash() {
    return this.__passwordHash;
  }

  update(update) {
    return new AccountAuthenticationView({
      id: update.id || this.__id,
      accountId: update.accountId || this.__accountId,
      passwordHash: update.passwordHash || this.__passwordHash
    });
  }

  toMap() {
    return (0, _immutable.Map)({
      id: this.__id,
      accountId: this.__accountId,
      passwordHash: this.__passwordHash
    });
  }

};
(0, _index.Record)(module, 'accountAuthentication')(AccountAuthenticationView);
exports.default = AccountAuthenticationView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY291bnQvcXVlcnkvYXV0aGVudGljYXRpb24vdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBTU0sNEJBQU4sTUFBTSx5QkFBTiw0QkFBZ0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUFoQzsyQkFEUTtrQkFTTyIsImZpbGUiOiJhY2NvdW50L3F1ZXJ5L2F1dGhlbnRpY2F0aW9uL3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgeyBSZWNvcmQgfSBmcm9tICcuLi8uLi8uLi9pbmRleCc7XG5cblxuQFJlY29yZCgnYWNjb3VudEF1dGhlbnRpY2F0aW9uJylcbmNsYXNzIEFjY291bnRBdXRoZW50aWNhdGlvblZpZXcge1xuXG4gIGlkOiBzdHJpbmc7XG4gIGFjY291bnRJZDogc3RyaW5nO1xuICBwYXNzd29yZEhhc2g6IHN0cmluZztcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50QXV0aGVudGljYXRpb25WaWV3O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
