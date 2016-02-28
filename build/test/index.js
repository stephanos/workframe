'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = Component;
exports.Record = Record;
exports.Inject = Inject;
exports.bootstrap = bootstrap;

var _factory = require('./internal/component/factory');

var _factory2 = _interopRequireDefault(_factory);

var _validator = require('./internal/component/validator');

var _validator2 = _interopRequireDefault(_validator);

var _types = require('./internal/component/types');

var _types2 = _interopRequireDefault(_types);

var _commandHandler = require('./internal/es/command/commandHandler');

var _commandHandler2 = _interopRequireDefault(_commandHandler);

var _store = require('./internal/es/store/store');

var _store2 = _interopRequireDefault(_store);

var _memory = require('./internal/es/store/storage/memory');

var _memory2 = _interopRequireDefault(_memory);

var _injector = require('./internal/ioc/injector');

var _injector2 = _interopRequireDefault(_injector);

var _registry = require('./internal/ioc/registry');

var _registry2 = _interopRequireDefault(_registry);

var _router = require('./internal/router');

var _router2 = _interopRequireDefault(_router);

var _api = require('./internal/api');

var _api2 = _interopRequireDefault(_api);

var _uuid = require('./internal/util/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _clock = require('./internal/util/clock');

var _clock2 = _interopRequireDefault(_clock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const componentRegistry = new _registry2.default();
const componentValidator = new _validator2.default();

const storage = new _memory2.default(_uuid2.default, _clock2.default);
const store = new _store2.default(storage, _uuid2.default, _clock2.default);
const commandHandler = new _commandHandler2.default(store, componentRegistry);

const componentFactory = new _factory2.default(_types2.default, componentRegistry, componentValidator);
function Component() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return target => {
    componentFactory.build(target, args);
  };
}

let RecordBase = class RecordBase {};
function Record() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return target => {
    componentFactory.build(target, args);
  };
}
Record.Base = RecordBase;

function Inject() {
  return _injector2.default.inject(...arguments);
}

const router = new _router2.default(componentRegistry, commandHandler);
function bootstrap(opts) {
  return new _api2.default(_types2.default, router, componentFactory, opts);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O1FBMEJnQjtRQVNBO1FBT0E7UUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTdCaEIsTUFBTSxvQkFBb0Isd0JBQXBCO0FBQ04sTUFBTSxxQkFBcUIseUJBQXJCOztBQUVOLE1BQU0sVUFBVSxxREFBVjtBQUNOLE1BQU0sUUFBUSxvQkFBZSxPQUFmLGtDQUFSO0FBQ04sTUFBTSxpQkFBaUIsNkJBQW1CLEtBQW5CLEVBQTBCLGlCQUExQixDQUFqQjs7QUFFTixNQUFNLG1CQUFtQix1Q0FBNEIsaUJBQTVCLEVBQStDLGtCQUEvQyxDQUFuQjtBQUNDLFNBQVMsU0FBVCxHQUE0QjtvQ0FBTjs7R0FBTTs7QUFDakMsU0FBTyxVQUFZO0FBQ2pCLHFCQUFpQixLQUFqQixDQUF1QixNQUF2QixFQUErQixJQUEvQixFQURpQjtHQUFaLENBRDBCO0NBQTVCOztJQU1ELGFBQU4sTUFBTSxVQUFOLENBQWlCLEVBQWpCO0FBR08sU0FBUyxNQUFULEdBQXlCO3FDQUFOOztHQUFNOztBQUM5QixTQUFPLFVBQVk7QUFDakIscUJBQWlCLEtBQWpCLENBQXVCLE1BQXZCLEVBQStCLElBQS9CLEVBRGlCO0dBQVosQ0FEdUI7Q0FBekI7QUFLUCxPQUFPLElBQVAsR0FBYyxVQUFkOztBQUVPLFNBQVMsTUFBVCxHQUF5QjtBQUM5QixTQUFPLG1CQUFTLE1BQVQsQ0FBZ0IsWUFBaEIsQ0FBUCxDQUQ4QjtDQUF6Qjs7QUFJUCxNQUFNLFNBQVMscUJBQVcsaUJBQVgsRUFBOEIsY0FBOUIsQ0FBVDtBQUNDLFNBQVMsU0FBVCxDQUFtQixJQUFuQixFQUF5QjtBQUM5QixTQUFPLG1DQUFlLE1BQWYsRUFBdUIsZ0JBQXZCLEVBQXlDLElBQXpDLENBQVAsQ0FEOEI7Q0FBekIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50RmFjdG9yeSBmcm9tICcuL2ludGVybmFsL2NvbXBvbmVudC9mYWN0b3J5JztcbmltcG9ydCBWYWxpZGF0b3IgZnJvbSAnLi9pbnRlcm5hbC9jb21wb25lbnQvdmFsaWRhdG9yJztcbmltcG9ydCB0eXBlcyBmcm9tICcuL2ludGVybmFsL2NvbXBvbmVudC90eXBlcyc7XG5cbmltcG9ydCBDb21tYW5kSGFuZGxlciBmcm9tICcuL2ludGVybmFsL2VzL2NvbW1hbmQvY29tbWFuZEhhbmRsZXInO1xuaW1wb3J0IEV2ZW50U3RvcmUgZnJvbSAnLi9pbnRlcm5hbC9lcy9zdG9yZS9zdG9yZSc7XG5pbXBvcnQgTWVtb3J5U3RvcmFnZSBmcm9tICcuL2ludGVybmFsL2VzL3N0b3JlL3N0b3JhZ2UvbWVtb3J5JztcblxuaW1wb3J0IEluamVjdG9yIGZyb20gJy4vaW50ZXJuYWwvaW9jL2luamVjdG9yJztcbmltcG9ydCBSZWdpc3RyeSBmcm9tICcuL2ludGVybmFsL2lvYy9yZWdpc3RyeSc7XG5cbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9pbnRlcm5hbC9yb3V0ZXInO1xuaW1wb3J0IEFQSSBmcm9tICcuL2ludGVybmFsL2FwaSc7XG5cbmltcG9ydCBpZEdlbmVyYXRvciBmcm9tICcuL2ludGVybmFsL3V0aWwvdXVpZCc7XG5pbXBvcnQgY2xvY2sgZnJvbSAnLi9pbnRlcm5hbC91dGlsL2Nsb2NrJztcblxuXG5jb25zdCBjb21wb25lbnRSZWdpc3RyeSA9IG5ldyBSZWdpc3RyeSgpO1xuY29uc3QgY29tcG9uZW50VmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcigpO1xuXG5jb25zdCBzdG9yYWdlID0gbmV3IE1lbW9yeVN0b3JhZ2UoaWRHZW5lcmF0b3IsIGNsb2NrKTtcbmNvbnN0IHN0b3JlID0gbmV3IEV2ZW50U3RvcmUoc3RvcmFnZSwgaWRHZW5lcmF0b3IsIGNsb2NrKTtcbmNvbnN0IGNvbW1hbmRIYW5kbGVyID0gbmV3IENvbW1hbmRIYW5kbGVyKHN0b3JlLCBjb21wb25lbnRSZWdpc3RyeSk7XG5cbmNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSBuZXcgQ29tcG9uZW50RmFjdG9yeSh0eXBlcywgY29tcG9uZW50UmVnaXN0cnksIGNvbXBvbmVudFZhbGlkYXRvcik7XG5leHBvcnQgZnVuY3Rpb24gQ29tcG9uZW50KC4uLmFyZ3MpIHtcbiAgcmV0dXJuICh0YXJnZXQpID0+IHtcbiAgICBjb21wb25lbnRGYWN0b3J5LmJ1aWxkKHRhcmdldCwgYXJncyk7XG4gIH07XG59XG5cbmNsYXNzIFJlY29yZEJhc2Uge1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjb3JkKC4uLmFyZ3MpIHtcbiAgcmV0dXJuICh0YXJnZXQpID0+IHtcbiAgICBjb21wb25lbnRGYWN0b3J5LmJ1aWxkKHRhcmdldCwgYXJncyk7XG4gIH07XG59XG5SZWNvcmQuQmFzZSA9IFJlY29yZEJhc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBJbmplY3QoLi4uYXJncykge1xuICByZXR1cm4gSW5qZWN0b3IuaW5qZWN0KC4uLmFyZ3MpO1xufVxuXG5jb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKGNvbXBvbmVudFJlZ2lzdHJ5LCBjb21tYW5kSGFuZGxlcik7XG5leHBvcnQgZnVuY3Rpb24gYm9vdHN0cmFwKG9wdHMpIHtcbiAgcmV0dXJuIG5ldyBBUEkodHlwZXMsIHJvdXRlciwgY29tcG9uZW50RmFjdG9yeSwgb3B0cyk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
