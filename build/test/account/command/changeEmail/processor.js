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

var _emailChanged = require('../../event/emailChanged');

var _emailChanged2 = _interopRequireDefault(_emailChanged);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

let ChangeEmailProcessor = (_dec = (0, _index.Component)(module, _command2.default), _dec(_class = class ChangeEmailProcessor {

  process(__dispatcher, aggregate, command) {
    return _asyncToGenerator(function* () {
      return new _emailChanged2.default({
        aggregateId: aggregate.id,
        newEmailAddress: command.newEmailAddress
      });
    })();
  }
}) || _class);
exports.default = ChangeEmailProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY291bnQvY29tbWFuZC9jaGFuZ2VFbWFpbC9wcm9jZXNzb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTTSwrQkFETCxnRUFDRCxNQUFNLG9CQUFOLENBQTJCOztBQUd6Qix3QkFBYyxTQUFkLEVBQ2MsT0FEZCxFQUN3RTs7QUFDdEUsYUFBTywyQkFBc0I7QUFDM0IscUJBQWEsVUFBVSxFQUFWO0FBQ2IseUJBQWlCLFFBQVEsZUFBUjtPQUZaLENBQVA7U0FEc0U7R0FEeEU7Q0FIRjtrQkFhZSIsImZpbGUiOiJhY2NvdW50L2NvbW1hbmQvY2hhbmdlRW1haWwvcHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vaW5kZXgnO1xuaW1wb3J0IENoYW5nZUVtYWlsQ29tbWFuZCBmcm9tICcuL2NvbW1hbmQnO1xuaW1wb3J0IEFjY291bnRBZ2dyZWdhdGVSb290IGZyb20gJy4uL2FnZ3JlZ2F0ZSc7XG5pbXBvcnQgRW1haWxDaGFuZ2VkRXZlbnQgZnJvbSAnLi4vLi4vZXZlbnQvZW1haWxDaGFuZ2VkJztcblxuXG5AQ29tcG9uZW50KENoYW5nZUVtYWlsQ29tbWFuZClcbmNsYXNzIENoYW5nZUVtYWlsUHJvY2Vzc29yIHtcblxuXG4gIGFzeW5jIHByb2Nlc3MoYWdncmVnYXRlOiBBY2NvdW50QWdncmVnYXRlUm9vdCxcbiAgICAgICAgICAgICAgICBjb21tYW5kOiBDaGFuZ2VFbWFpbENvbW1hbmQpOiBQcm9taXNlPENoYW5nZUVtYWlsQ29tbWFuZD4ge1xuICAgIHJldHVybiBuZXcgRW1haWxDaGFuZ2VkRXZlbnQoe1xuICAgICAgYWdncmVnYXRlSWQ6IGFnZ3JlZ2F0ZS5pZCxcbiAgICAgIG5ld0VtYWlsQWRkcmVzczogY29tbWFuZC5uZXdFbWFpbEFkZHJlc3MsXG4gICAgfSk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDaGFuZ2VFbWFpbFByb2Nlc3NvcjtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
