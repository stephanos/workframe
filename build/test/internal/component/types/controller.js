'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp; /* eslint no-param-reassign:0 */

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ControllerComponentType = (_temp = _class = class ControllerComponentType {

  static verify() {}

  static beforeInitialize(context) {
    context.httpRouter = new _koaRouter2.default();
  }

  static initialize(context, component) {
    const basePath = component.opts[1];
    const proto = component.factory.prototype;
    Object.getOwnPropertyNames(proto).forEach(key => {
      const path = proto[key].path;
      const method = proto[key].method;
      if (path && method) {
        const fullPath = basePath + path;
        context.httpRouter[method.toLowerCase()](fullPath, (ctx, next) => {
          context.router.invoke(component, key, [ctx.request, ctx.response, next]);
        });
      }
    });
  }

  static afterInitialize(context) {
    const koa = new _koa2.default();
    koa.use(context.httpRouter.routes());
    koa.use(context.httpRouter.allowedMethods());

    context.httpServer = _http2.default.createServer(koa.callback());
    context.httpServer.listen(9000);
  }

  static terminate(context) {
    context.httpServer.close();
  }
}, _class.typeName = 'Controller', _class.injectTypeWhitelist = ['Accessor', 'Processor'], _temp);
exports.default = ControllerComponentType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2NvbXBvbmVudC90eXBlcy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPTSw0Q0FBTixNQUFNLHVCQUFOLENBQThCOztBQUs1QixTQUFPLE1BQVAsR0FBZ0IsRUFBaEI7O0FBR0EsU0FBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQztBQUMvQixZQUFRLFVBQVIsR0FBcUIseUJBQXJCLENBRCtCO0dBQWpDOztBQUlBLFNBQU8sVUFBUCxDQUFrQixPQUFsQixFQUEyQixTQUEzQixFQUFzQztBQUNwQyxVQUFNLFdBQVcsVUFBVSxJQUFWLENBQWUsQ0FBZixDQUFYLENBRDhCO0FBRXBDLFVBQU0sUUFBUSxVQUFVLE9BQVYsQ0FBa0IsU0FBbEIsQ0FGc0I7QUFHcEMsV0FBTyxtQkFBUCxDQUEyQixLQUEzQixFQUFrQyxPQUFsQyxDQUEwQyxPQUFTO0FBQ2pELFlBQU0sT0FBTyxNQUFNLEdBQU4sRUFBVyxJQUFYLENBRG9DO0FBRWpELFlBQU0sU0FBUyxNQUFNLEdBQU4sRUFBVyxNQUFYLENBRmtDO0FBR2pELFVBQUksUUFBUSxNQUFSLEVBQWdCO0FBQ2xCLGNBQU0sV0FBVyxXQUFXLElBQVgsQ0FEQztBQUVsQixnQkFBUSxVQUFSLENBQW1CLE9BQU8sV0FBUCxFQUFuQixFQUF5QyxRQUF6QyxFQUFtRCxDQUFDLEdBQUQsRUFBTSxJQUFOLEtBQWU7QUFDaEUsa0JBQVEsTUFBUixDQUFlLE1BQWYsQ0FBc0IsU0FBdEIsRUFBaUMsR0FBakMsRUFBc0MsQ0FBQyxJQUFJLE9BQUosRUFBYSxJQUFJLFFBQUosRUFBYyxJQUE1QixDQUF0QyxFQURnRTtTQUFmLENBQW5ELENBRmtCO09BQXBCO0tBSHdDLENBQTFDLENBSG9DO0dBQXRDOztBQWVBLFNBQU8sZUFBUCxDQUF1QixPQUF2QixFQUFnQztBQUM5QixVQUFNLE1BQU0sbUJBQU4sQ0FEd0I7QUFFOUIsUUFBSSxHQUFKLENBQVEsUUFBUSxVQUFSLENBQW1CLE1BQW5CLEVBQVIsRUFGOEI7QUFHOUIsUUFBSSxHQUFKLENBQVEsUUFBUSxVQUFSLENBQW1CLGNBQW5CLEVBQVIsRUFIOEI7O0FBSzlCLFlBQVEsVUFBUixHQUFxQixlQUFLLFlBQUwsQ0FBa0IsSUFBSSxRQUFKLEVBQWxCLENBQXJCLENBTDhCO0FBTTlCLFlBQVEsVUFBUixDQUFtQixNQUFuQixDQUEwQixJQUExQixFQU44QjtHQUFoQzs7QUFTQSxTQUFPLFNBQVAsQ0FBaUIsT0FBakIsRUFBMEI7QUFDeEIsWUFBUSxVQUFSLENBQW1CLEtBQW5CLEdBRHdCO0dBQTFCO0NBcENGLFNBRVMsV0FBVyxxQkFDWCxzQkFBc0IsQ0FBQyxVQUFELEVBQWEsV0FBYjtrQkF1Q2hCIiwiZmlsZSI6ImludGVybmFsL2NvbXBvbmVudC90eXBlcy9jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAgKi9cblxuaW1wb3J0IEtvYSBmcm9tICdrb2EnO1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgUm91dGVyIGZyb20gJ2tvYS1yb3V0ZXInO1xuXG5cbmNsYXNzIENvbnRyb2xsZXJDb21wb25lbnRUeXBlIHtcblxuICBzdGF0aWMgdHlwZU5hbWUgPSAnQ29udHJvbGxlcic7XG4gIHN0YXRpYyBpbmplY3RUeXBlV2hpdGVsaXN0ID0gWydBY2Nlc3NvcicsICdQcm9jZXNzb3InXTtcblxuICBzdGF0aWMgdmVyaWZ5KCkge1xuICB9XG5cbiAgc3RhdGljIGJlZm9yZUluaXRpYWxpemUoY29udGV4dCkge1xuICAgIGNvbnRleHQuaHR0cFJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0aWFsaXplKGNvbnRleHQsIGNvbXBvbmVudCkge1xuICAgIGNvbnN0IGJhc2VQYXRoID0gY29tcG9uZW50Lm9wdHNbMV07XG4gICAgY29uc3QgcHJvdG8gPSBjb21wb25lbnQuZmFjdG9yeS5wcm90b3R5cGU7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgcGF0aCA9IHByb3RvW2tleV0ucGF0aDtcbiAgICAgIGNvbnN0IG1ldGhvZCA9IHByb3RvW2tleV0ubWV0aG9kO1xuICAgICAgaWYgKHBhdGggJiYgbWV0aG9kKSB7XG4gICAgICAgIGNvbnN0IGZ1bGxQYXRoID0gYmFzZVBhdGggKyBwYXRoO1xuICAgICAgICBjb250ZXh0Lmh0dHBSb3V0ZXJbbWV0aG9kLnRvTG93ZXJDYXNlKCldKGZ1bGxQYXRoLCAoY3R4LCBuZXh0KSA9PiB7XG4gICAgICAgICAgY29udGV4dC5yb3V0ZXIuaW52b2tlKGNvbXBvbmVudCwga2V5LCBbY3R4LnJlcXVlc3QsIGN0eC5yZXNwb25zZSwgbmV4dF0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhZnRlckluaXRpYWxpemUoY29udGV4dCkge1xuICAgIGNvbnN0IGtvYSA9IG5ldyBLb2EoKTtcbiAgICBrb2EudXNlKGNvbnRleHQuaHR0cFJvdXRlci5yb3V0ZXMoKSk7XG4gICAga29hLnVzZShjb250ZXh0Lmh0dHBSb3V0ZXIuYWxsb3dlZE1ldGhvZHMoKSk7XG5cbiAgICBjb250ZXh0Lmh0dHBTZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihrb2EuY2FsbGJhY2soKSk7XG4gICAgY29udGV4dC5odHRwU2VydmVyLmxpc3Rlbig5MDAwKTtcbiAgfVxuXG4gIHN0YXRpYyB0ZXJtaW5hdGUoY29udGV4dCkge1xuICAgIGNvbnRleHQuaHR0cFNlcnZlci5jbG9zZSgpO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlckNvbXBvbmVudFR5cGU7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
