'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./component/component');

var _component2 = _interopRequireDefault(_component);

var _collector = require('./introspection/collector');

var _collector2 = _interopRequireDefault(_collector);

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _uuid = require('../internal/util/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _clock = require('../internal/util/clock');

var _clock2 = _interopRequireDefault(_clock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

let Result = class Result {

  constructor(result, collector) {
    this.result = result;
    this.collector = collector;
  }
};
let Router = class Router {

  constructor(registry, commandHandler, queryHandler) {
    this.registry = registry;
    this.commandHandler = commandHandler;
    this.queryHandler = queryHandler;
  }

  handle(signal) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const component = new _component2.default(_this.registry.getConnection('handles', signal.constructor));
      if (!component) {
        throw new Error(`unable to handle signal: no matching handler found for '${ signal.constructor.name }'`);
      }

      const collector = new _collector2.default();
      const dispatcher = new _dispatcher2.default(null, collector, _uuid2.default, _clock2.default);
      const handler = _this.registry.get(component);
      const handleFn = function (aggregate, command) {
        return handler.process(dispatcher, aggregate, command);
      };

      let result;
      const type = component.type.typeName;
      if (type === 'Accessor') {
        result = yield _this.queryHandler.handle(handleFn, signal);
      } else if (type === 'Processor') {
        result = yield _this.commandHandler.handle(handleFn, signal);
      } else {
        throw new Error(`unable to handle signal: Component must be 'Accessor' or 'Processor' but is '${ type }'`);
      }

      return new Result(result, collector);
    })();
  }
};
exports.default = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL3JvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRTSxTQUFOLE1BQU0sTUFBTixDQUFhOztBQUVYLGNBQVksTUFBWixFQUFvQixTQUFwQixFQUErQjtBQUM3QixTQUFLLE1BQUwsR0FBYyxNQUFkLENBRDZCO0FBRTdCLFNBQUssU0FBTCxHQUFpQixTQUFqQixDQUY2QjtHQUEvQjtDQUZGO0lBU00sU0FBTixNQUFNLE1BQU4sQ0FBYTs7QUFFWCxjQUFZLFFBQVosRUFBc0IsY0FBdEIsRUFBc0MsWUFBdEMsRUFBb0Q7QUFDbEQsU0FBSyxRQUFMLEdBQWdCLFFBQWhCLENBRGtEO0FBRWxELFNBQUssY0FBTCxHQUFzQixjQUF0QixDQUZrRDtBQUdsRCxTQUFLLFlBQUwsR0FBb0IsWUFBcEIsQ0FIa0Q7R0FBcEQ7O0FBTUEsU0FBYSxNQUFiLEVBQXFCOzs7O0FBQ25CLFlBQU0sWUFBWSx3QkFBYyxNQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLFNBQTVCLEVBQXVDLE9BQU8sV0FBUCxDQUFyRCxDQUFaO0FBQ04sVUFBSSxDQUFDLFNBQUQsRUFBWTtBQUNkLGNBQU0sSUFBSSxLQUFKLENBQVUsQ0FBQyx3REFBRCxHQUEyRCxPQUFPLFdBQVAsQ0FBbUIsSUFBbkIsRUFBd0IsQ0FBbkYsQ0FBVixDQUFOLENBRGM7T0FBaEI7O0FBSUEsWUFBTSxZQUFZLHlCQUFaO0FBQ04sWUFBTSxhQUFhLHlCQUFlLElBQWYsRUFBcUIsU0FBckIsa0NBQWI7QUFDTixZQUFNLFVBQVUsTUFBSyxRQUFMLENBQWMsR0FBZCxDQUFrQixTQUFsQixDQUFWO0FBQ04sWUFBTSxXQUFXLFVBQUMsU0FBRCxFQUFZLE9BQVo7ZUFBd0IsUUFBUSxPQUFSLENBQWdCLFVBQWhCLEVBQTRCLFNBQTVCLEVBQXVDLE9BQXZDO09BQXhCOztBQUVqQixVQUFJLE1BQUo7QUFDQSxZQUFNLE9BQU8sVUFBVSxJQUFWLENBQWUsUUFBZjtBQUNiLFVBQUksU0FBUyxVQUFULEVBQXFCO0FBQ3ZCLGlCQUFTLE1BQU0sTUFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLFFBQXpCLEVBQW1DLE1BQW5DLENBQU4sQ0FEYztPQUF6QixNQUVPLElBQUksU0FBUyxXQUFULEVBQXNCO0FBQy9CLGlCQUFTLE1BQU0sTUFBSyxjQUFMLENBQW9CLE1BQXBCLENBQTJCLFFBQTNCLEVBQXFDLE1BQXJDLENBQU4sQ0FEc0I7T0FBMUIsTUFFQTtBQUNMLGNBQU0sSUFBSSxLQUFKLENBQVUsQ0FBQyw2RUFBRCxHQUFnRixJQUFoRixFQUFxRixDQUFyRixDQUFWLENBQU4sQ0FESztPQUZBOztBQU1QLGFBQU8sSUFBSSxNQUFKLENBQVcsTUFBWCxFQUFtQixTQUFuQixDQUFQO1NBckJtQjtHQUFyQjtDQVJGO2tCQWtDZSIsImZpbGUiOiJpbnRlcm5hbC9yb3V0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50L2NvbXBvbmVudCc7XG5pbXBvcnQgQ29sbGVjdG9yIGZyb20gJy4vaW50cm9zcGVjdGlvbi9jb2xsZWN0b3InO1xuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSAnLi9kaXNwYXRjaGVyJztcblxuaW1wb3J0IGlkR2VuZXJhdG9yIGZyb20gJy4uL2ludGVybmFsL3V0aWwvdXVpZCc7XG5pbXBvcnQgY2xvY2sgZnJvbSAnLi4vaW50ZXJuYWwvdXRpbC9jbG9jayc7XG5cblxuY2xhc3MgUmVzdWx0IHtcblxuICBjb25zdHJ1Y3RvcihyZXN1bHQsIGNvbGxlY3Rvcikge1xuICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICAgIHRoaXMuY29sbGVjdG9yID0gY29sbGVjdG9yO1xuICB9XG59XG5cblxuY2xhc3MgUm91dGVyIHtcblxuICBjb25zdHJ1Y3RvcihyZWdpc3RyeSwgY29tbWFuZEhhbmRsZXIsIHF1ZXJ5SGFuZGxlcikge1xuICAgIHRoaXMucmVnaXN0cnkgPSByZWdpc3RyeTtcbiAgICB0aGlzLmNvbW1hbmRIYW5kbGVyID0gY29tbWFuZEhhbmRsZXI7XG4gICAgdGhpcy5xdWVyeUhhbmRsZXIgPSBxdWVyeUhhbmRsZXI7XG4gIH1cblxuICBhc3luYyBoYW5kbGUoc2lnbmFsKSB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gbmV3IENvbXBvbmVudCh0aGlzLnJlZ2lzdHJ5LmdldENvbm5lY3Rpb24oJ2hhbmRsZXMnLCBzaWduYWwuY29uc3RydWN0b3IpKTtcbiAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmFibGUgdG8gaGFuZGxlIHNpZ25hbDogbm8gbWF0Y2hpbmcgaGFuZGxlciBmb3VuZCBmb3IgJyR7c2lnbmFsLmNvbnN0cnVjdG9yLm5hbWV9J2ApO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbGxlY3RvciA9IG5ldyBDb2xsZWN0b3IoKTtcbiAgICBjb25zdCBkaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIobnVsbCwgY29sbGVjdG9yLCBpZEdlbmVyYXRvciwgY2xvY2spO1xuICAgIGNvbnN0IGhhbmRsZXIgPSB0aGlzLnJlZ2lzdHJ5LmdldChjb21wb25lbnQpO1xuICAgIGNvbnN0IGhhbmRsZUZuID0gKGFnZ3JlZ2F0ZSwgY29tbWFuZCkgPT4gaGFuZGxlci5wcm9jZXNzKGRpc3BhdGNoZXIsIGFnZ3JlZ2F0ZSwgY29tbWFuZCk7XG5cbiAgICBsZXQgcmVzdWx0O1xuICAgIGNvbnN0IHR5cGUgPSBjb21wb25lbnQudHlwZS50eXBlTmFtZTtcbiAgICBpZiAodHlwZSA9PT0gJ0FjY2Vzc29yJykge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5xdWVyeUhhbmRsZXIuaGFuZGxlKGhhbmRsZUZuLCBzaWduYWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1Byb2Nlc3NvcicpIHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuY29tbWFuZEhhbmRsZXIuaGFuZGxlKGhhbmRsZUZuLCBzaWduYWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuYWJsZSB0byBoYW5kbGUgc2lnbmFsOiBDb21wb25lbnQgbXVzdCBiZSAnQWNjZXNzb3InIG9yICdQcm9jZXNzb3InIGJ1dCBpcyAnJHt0eXBlfSdgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3VsdChyZXN1bHQsIGNvbGxlY3Rvcik7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXI7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
