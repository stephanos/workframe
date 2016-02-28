'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../index');

var _immutable = require('immutable');

let EmailChangedEvent = class EmailChangedEvent extends _index.Record.Base {
  constructor(init) {
    super();
    this.__aggregateId = init.aggregateId;
    this.__newEmailAddress = init.newEmailAddress;
  }

  get aggregateId() {
    return this.__aggregateId;
  }

  get newEmailAddress() {
    return this.__newEmailAddress;
  }

  update(update) {
    return new EmailChangedEvent({
      aggregateId: update.aggregateId || this.__aggregateId,
      newEmailAddress: update.newEmailAddress || this.__newEmailAddress
    });
  }

  toMap() {
    return (0, _immutable.Map)({
      aggregateId: this.__aggregateId,
      newEmailAddress: this.__newEmailAddress
    });
  }

};
(0, _index.Record)(module, 'emailChanged')(EmailChangedEvent);
exports.default = EmailChangedEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY291bnQvZXZlbnQvZW1haWxDaGFuZ2VkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFNTSxvQkFBTixNQUFNLGlCQUFOLDRCQUF3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FBeEI7MkJBRFE7a0JBU08iLCJmaWxlIjoiYWNjb3VudC9ldmVudC9lbWFpbENoYW5nZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgeyBSZWNvcmQgfSBmcm9tICcuLi8uLi9pbmRleCc7XG5cblxuQFJlY29yZCgnZW1haWxDaGFuZ2VkJylcbmNsYXNzIEVtYWlsQ2hhbmdlZEV2ZW50IHtcblxuICBhZ2dyZWdhdGVJZDogc3RyaW5nO1xuXG4gIG5ld0VtYWlsQWRkcmVzczogc3RyaW5nO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEVtYWlsQ2hhbmdlZEV2ZW50O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
