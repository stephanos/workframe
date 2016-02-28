'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requireDirectory = require('require-directory');

var _requireDirectory2 = _interopRequireDefault(_requireDirectory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createContext(types, router) {
  const context = {};
  types.forEach(t => {
    context[t.typeName] = {
      router
    };
  });
  return context;
}

function beforeInit(context, types) {
  types.forEach(t => {
    if (t.beforeInitialize) {
      t.beforeInitialize(context[t.typeName]);
    }
  });
}

function loadComponents(module) {
  (0, _requireDirectory2.default)(module, {
    exclude: path => /.\.spec.js$/.test(path) || /node_modules$/.test(path)
  });
}

function initComponents(context, components) {
  components.forEach(component => {
    const type = component.type;
    if (type.initialize) {
      type.initialize(context[type.typeName], component);
    }

    if (component.initialize) {
      component.initialize();
    }
  });
}

function afterInit(context, types) {
  types.forEach(t => {
    if (t.afterInitialize) {
      t.afterInitialize(context[t.typeName]);
    }
  });
}

let API = class API {

  constructor(types, router, componentFactory, opts) {
    this.types = types;
    this.router = router;

    this.context = createContext(types, router);
    beforeInit(this.context, types);
    loadComponents(opts.module);
    initComponents(this.context, componentFactory.componentsSortedByCreation);
    afterInit(this.context, types);
  }

  dispatch() {
    return this.router.handle(...arguments);
  }

  terminate() {
    this.types.forEach(t => {
      if (t.terminate) {
        t.terminate(this.context[t.typeName]);
      }
    });
  }
};
exports.default = API;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2FwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFHQSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsRUFBOEIsTUFBOUIsRUFBc0M7QUFDcEMsUUFBTSxVQUFVLEVBQVYsQ0FEOEI7QUFFcEMsUUFBTSxPQUFOLENBQWMsS0FBTztBQUNuQixZQUFRLEVBQUUsUUFBRixDQUFSLEdBQXNCO0FBQ3BCLFlBRG9CO0tBQXRCLENBRG1CO0dBQVAsQ0FBZCxDQUZvQztBQU9wQyxTQUFPLE9BQVAsQ0FQb0M7Q0FBdEM7O0FBV0EsU0FBUyxVQUFULENBQW9CLE9BQXBCLEVBQTZCLEtBQTdCLEVBQW9DO0FBQ2xDLFFBQU0sT0FBTixDQUFjLEtBQU87QUFDbkIsUUFBSSxFQUFFLGdCQUFGLEVBQW9CO0FBQ3RCLFFBQUUsZ0JBQUYsQ0FBbUIsUUFBUSxFQUFFLFFBQUYsQ0FBM0IsRUFEc0I7S0FBeEI7R0FEWSxDQUFkLENBRGtDO0NBQXBDOztBQVFBLFNBQVMsY0FBVCxDQUF3QixNQUF4QixFQUFnQztBQUM5QixrQ0FBaUIsTUFBakIsRUFBeUI7QUFDdkIsYUFBUyxRQUFVLGNBQWMsSUFBZCxDQUFtQixJQUFuQixLQUE0QixnQkFBZ0IsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBNUI7R0FEckIsRUFEOEI7Q0FBaEM7O0FBTUEsU0FBUyxjQUFULENBQXdCLE9BQXhCLEVBQWlDLFVBQWpDLEVBQTZDO0FBQzNDLGFBQVcsT0FBWCxDQUFtQixhQUFlO0FBQ2hDLFVBQU0sT0FBTyxVQUFVLElBQVYsQ0FEbUI7QUFFaEMsUUFBSSxLQUFLLFVBQUwsRUFBaUI7QUFDbkIsV0FBSyxVQUFMLENBQWdCLFFBQVEsS0FBSyxRQUFMLENBQXhCLEVBQXdDLFNBQXhDLEVBRG1CO0tBQXJCOztBQUlBLFFBQUksVUFBVSxVQUFWLEVBQXNCO0FBQ3hCLGdCQUFVLFVBQVYsR0FEd0I7S0FBMUI7R0FOaUIsQ0FBbkIsQ0FEMkM7Q0FBN0M7O0FBYUEsU0FBUyxTQUFULENBQW1CLE9BQW5CLEVBQTRCLEtBQTVCLEVBQW1DO0FBQ2pDLFFBQU0sT0FBTixDQUFjLEtBQU87QUFDbkIsUUFBSSxFQUFFLGVBQUYsRUFBbUI7QUFDckIsUUFBRSxlQUFGLENBQWtCLFFBQVEsRUFBRSxRQUFGLENBQTFCLEVBRHFCO0tBQXZCO0dBRFksQ0FBZCxDQURpQztDQUFuQzs7SUFTTSxNQUFOLE1BQU0sR0FBTixDQUFVOztBQUVSLGNBQVksS0FBWixFQUFtQixNQUFuQixFQUEyQixnQkFBM0IsRUFBNkMsSUFBN0MsRUFBbUQ7QUFDakQsU0FBSyxLQUFMLEdBQWEsS0FBYixDQURpRDtBQUVqRCxTQUFLLE1BQUwsR0FBYyxNQUFkLENBRmlEOztBQUlqRCxTQUFLLE9BQUwsR0FBZSxjQUFjLEtBQWQsRUFBcUIsTUFBckIsQ0FBZixDQUppRDtBQUtqRCxlQUFXLEtBQUssT0FBTCxFQUFjLEtBQXpCLEVBTGlEO0FBTWpELG1CQUFlLEtBQUssTUFBTCxDQUFmLENBTmlEO0FBT2pELG1CQUFlLEtBQUssT0FBTCxFQUFjLGlCQUFpQiwwQkFBakIsQ0FBN0IsQ0FQaUQ7QUFRakQsY0FBVSxLQUFLLE9BQUwsRUFBYyxLQUF4QixFQVJpRDtHQUFuRDs7QUFXQSxhQUFrQjtBQUNoQixXQUFPLEtBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsWUFBbkIsQ0FBUCxDQURnQjtHQUFsQjs7QUFJQSxjQUFZO0FBQ1YsU0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUFPO0FBQ3hCLFVBQUksRUFBRSxTQUFGLEVBQWE7QUFDZixVQUFFLFNBQUYsQ0FBWSxLQUFLLE9BQUwsQ0FBYSxFQUFFLFFBQUYsQ0FBekIsRUFEZTtPQUFqQjtLQURpQixDQUFuQixDQURVO0dBQVo7Q0FqQkY7a0JBMkJlIiwiZmlsZSI6ImludGVybmFsL2FwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXF1aXJlRGlyZWN0b3J5IGZyb20gJ3JlcXVpcmUtZGlyZWN0b3J5JztcblxuXG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0KHR5cGVzLCByb3V0ZXIpIHtcbiAgY29uc3QgY29udGV4dCA9IHt9O1xuICB0eXBlcy5mb3JFYWNoKCh0KSA9PiB7XG4gICAgY29udGV4dFt0LnR5cGVOYW1lXSA9IHtcbiAgICAgIHJvdXRlcixcbiAgICB9O1xuICB9KTtcbiAgcmV0dXJuIGNvbnRleHQ7XG59XG5cblxuZnVuY3Rpb24gYmVmb3JlSW5pdChjb250ZXh0LCB0eXBlcykge1xuICB0eXBlcy5mb3JFYWNoKCh0KSA9PiB7XG4gICAgaWYgKHQuYmVmb3JlSW5pdGlhbGl6ZSkge1xuICAgICAgdC5iZWZvcmVJbml0aWFsaXplKGNvbnRleHRbdC50eXBlTmFtZV0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRDb21wb25lbnRzKG1vZHVsZSkge1xuICByZXF1aXJlRGlyZWN0b3J5KG1vZHVsZSwge1xuICAgIGV4Y2x1ZGU6IChwYXRoKSA9PiAvLlxcLnNwZWMuanMkLy50ZXN0KHBhdGgpIHx8IC9ub2RlX21vZHVsZXMkLy50ZXN0KHBhdGgpLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdENvbXBvbmVudHMoY29udGV4dCwgY29tcG9uZW50cykge1xuICBjb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xuICAgIGNvbnN0IHR5cGUgPSBjb21wb25lbnQudHlwZTtcbiAgICBpZiAodHlwZS5pbml0aWFsaXplKSB7XG4gICAgICB0eXBlLmluaXRpYWxpemUoY29udGV4dFt0eXBlLnR5cGVOYW1lXSwgY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBpZiAoY29tcG9uZW50LmluaXRpYWxpemUpIHtcbiAgICAgIGNvbXBvbmVudC5pbml0aWFsaXplKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWZ0ZXJJbml0KGNvbnRleHQsIHR5cGVzKSB7XG4gIHR5cGVzLmZvckVhY2goKHQpID0+IHtcbiAgICBpZiAodC5hZnRlckluaXRpYWxpemUpIHtcbiAgICAgIHQuYWZ0ZXJJbml0aWFsaXplKGNvbnRleHRbdC50eXBlTmFtZV0pO1xuICAgIH1cbiAgfSk7XG59XG5cblxuY2xhc3MgQVBJIHtcblxuICBjb25zdHJ1Y3Rvcih0eXBlcywgcm91dGVyLCBjb21wb25lbnRGYWN0b3J5LCBvcHRzKSB7XG4gICAgdGhpcy50eXBlcyA9IHR5cGVzO1xuICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gY3JlYXRlQ29udGV4dCh0eXBlcywgcm91dGVyKTtcbiAgICBiZWZvcmVJbml0KHRoaXMuY29udGV4dCwgdHlwZXMpO1xuICAgIGxvYWRDb21wb25lbnRzKG9wdHMubW9kdWxlKTtcbiAgICBpbml0Q29tcG9uZW50cyh0aGlzLmNvbnRleHQsIGNvbXBvbmVudEZhY3RvcnkuY29tcG9uZW50c1NvcnRlZEJ5Q3JlYXRpb24pO1xuICAgIGFmdGVySW5pdCh0aGlzLmNvbnRleHQsIHR5cGVzKTtcbiAgfVxuXG4gIGRpc3BhdGNoKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuaGFuZGxlKC4uLmFyZ3MpO1xuICB9XG5cbiAgdGVybWluYXRlKCkge1xuICAgIHRoaXMudHlwZXMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgaWYgKHQudGVybWluYXRlKSB7XG4gICAgICAgIHQudGVybWluYXRlKHRoaXMuY29udGV4dFt0LnR5cGVOYW1lXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBUEk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
