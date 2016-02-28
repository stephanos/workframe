'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _registry = require('./registry');

var _registry2 = _interopRequireDefault(_registry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let type;
let registry;
let myComponent;

describe('Registry', () => {
  let MyComponent = class MyComponent {};


  beforeEach(() => {
    registry = new _registry2.default();
    type = {
      typeName: 'Component',
      injectTypeWhitelist: ['Component']
    };
    myComponent = {
      id: 0,
      factory: MyComponent,
      namespace: 'ns',
      name: 'my',
      type,
      dependencies: {},
      newInstance: () => new MyComponent()
    };
  });

  describe('adding a component', () => {
    it('should succeed', () => {
      registry.add(myComponent);
    });

    it('should fail for already existing ID', () => {
      registry.add(myComponent);

      _assert2.default.throws(() => registry.add(myComponent), err => err.message === 'can not register \'my\': already registered');
    });

    describe('that is a singleton', () => {
      it('should succeed', () => {
        type.isSingleton = true;

        registry.add(myComponent);
      });
    });
  });

  describe('resolving a component', () => {
    let ComponentA = class ComponentA {};

    let componentA;

    let ComponentB = class ComponentB {};

    let componentB;

    beforeEach(() => {
      componentA = {
        id: 1,
        factory: ComponentA,
        namespace: 'ns',
        name: 'A',
        type,
        dependencies: {},
        newInstance: () => new ComponentA()
      };
      componentB = {
        id: 2,
        factory: ComponentB,
        namespace: 'ns',
        name: 'B',
        type,
        dependencies: { dependencyA: componentA },
        newInstance: () => new ComponentB()
      };
    });

    it('should succeed for component without dependencies', () => {
      registry.add(myComponent);

      const resolved = registry.get(myComponent);

      _assert2.default.ok(resolved);
      _assert2.default.ok(resolved instanceof MyComponent);
    });

    it('should succeed for component with one direct dependency', () => {
      myComponent.dependencies = { dependencyA: componentA };

      registry.add(componentA);
      registry.add(myComponent);
      const resolved = registry.get(myComponent);

      _assert2.default.ok(resolved);
      _assert2.default.ok(resolved.dependencyA);
    });

    it('should succeed for component with transitive dependencies', () => {
      myComponent.dependencies = { dependencyB: componentB };

      registry.add(componentA);
      registry.add(componentB);
      registry.add(myComponent);
      const resolved = registry.get(myComponent);

      _assert2.default.ok(resolved);
      _assert2.default.ok(resolved.dependencyB);
      _assert2.default.ok(resolved.dependencyB.dependencyA);
    });

    it('should only create each dependency only once', () => {
      myComponent.dependencies = {
        dependencyA: componentA,
        dependencyB: componentB
      };

      registry.add(componentA);
      registry.add(componentB);
      registry.add(myComponent);
      const resolved = registry.get(myComponent);

      _assert2.default.equal(resolved.dependencyB.dependencyA, resolved.dependencyA);
    });

    it('should fail for missing component', () => {
      _assert2.default.throws(() => registry.get(myComponent), err => err.message === 'unable to resolve \'MyComponent\': not found');
    });

    it('should fail for missing direct dependency', () => {
      myComponent.dependencies = { dependencyA: componentA };

      registry.add(myComponent);

      _assert2.default.throws(() => registry.get(myComponent), err => err.message === 'unable to resolve \'ComponentA\': not found (trace: \'MyComponent\')');
    });

    it('should fail for missing transitive dependency', () => {
      myComponent.dependencies = { dependencyB: componentB };

      registry.add(componentB);
      registry.add(myComponent);

      _assert2.default.throws(() => registry.get(myComponent), err => err.message === 'unable to resolve \'ComponentA\': not found (trace: \'MyComponent\' -> \'ComponentB\')');
    });

    it('should fail for circular dependency', () => {
      myComponent.dependencies = { dependencyB: componentB };
      componentB.dependencies = { dependencyA: componentA };
      componentA.dependencies = { dependencyB: componentB };

      registry.add(componentA);
      registry.add(componentB);
      registry.add(myComponent);

      _assert2.default.throws(() => registry.get(myComponent), err => err.message === 'unable to resolve \'ComponentB\': circular dependency \'MyComponent\' -> \'ComponentB\' -> \'ComponentA\' -> \'ComponentB\'');
    });

    describe('that is a singleton', () => {
      it('should succeed', () => {
        type.isSingleton = true;

        registry.add(myComponent);
        const resolved1 = registry.get(myComponent);
        const resolved2 = registry.get(myComponent);

        _assert2.default.equal(resolved1, resolved2);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2lvYy9yZWdpc3RyeS5zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBLElBQUksSUFBSjtBQUNBLElBQUksUUFBSjtBQUNBLElBQUksV0FBSjs7QUFFQSxTQUFTLFVBQVQsRUFBcUIsTUFBTTtNQUNuQixjQUFOLE1BQU0sV0FBTixDQUFrQixFQUFsQixDQUR5Qjs7O0FBSXpCLGFBQVcsTUFBTTtBQUNmLGVBQVcsd0JBQVgsQ0FEZTtBQUVmLFdBQU87QUFDTCxnQkFBVSxXQUFWO0FBQ0EsMkJBQXFCLENBQUMsV0FBRCxDQUFyQjtLQUZGLENBRmU7QUFNZixrQkFBYztBQUNaLFVBQUksQ0FBSjtBQUNBLGVBQVMsV0FBVDtBQUNBLGlCQUFXLElBQVg7QUFDQSxZQUFNLElBQU47QUFDQSxVQUxZO0FBTVosb0JBQWMsRUFBZDtBQUNBLG1CQUFhLE1BQU0sSUFBSSxXQUFKLEVBQU47S0FQZixDQU5lO0dBQU4sQ0FBWCxDQUp5Qjs7QUFxQnpCLFdBQVMsb0JBQVQsRUFBK0IsTUFBTTtBQUNuQyxPQUFHLGdCQUFILEVBQXFCLE1BQU07QUFDekIsZUFBUyxHQUFULENBQWEsV0FBYixFQUR5QjtLQUFOLENBQXJCLENBRG1DOztBQUtuQyxPQUFHLHFDQUFILEVBQTBDLE1BQU07QUFDOUMsZUFBUyxHQUFULENBQWEsV0FBYixFQUQ4Qzs7QUFHOUMsdUJBQU8sTUFBUCxDQUNFLE1BQU0sU0FBUyxHQUFULENBQWEsV0FBYixDQUFOLEVBQ0EsT0FBUyxJQUFJLE9BQUosS0FBZ0IsNkNBQWhCLENBRlgsQ0FIOEM7S0FBTixDQUExQyxDQUxtQzs7QUFhbkMsYUFBUyxxQkFBVCxFQUFnQyxNQUFNO0FBQ3BDLFNBQUcsZ0JBQUgsRUFBcUIsTUFBTTtBQUN6QixhQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FEeUI7O0FBR3pCLGlCQUFTLEdBQVQsQ0FBYSxXQUFiLEVBSHlCO09BQU4sQ0FBckIsQ0FEb0M7S0FBTixDQUFoQyxDQWJt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Q0FGWCxDQVQ4QztLQUFOLENBQTFDLENBdEdzQzs7QUFvSHRDLGFBQVMscUJBQVQsRUFBZ0MsTUFBTTtBQUNwQyxTQUFHLGdCQUFILEVBQXFCLE1BQU07QUFDekIsYUFBSyxXQUFMLEdBQW1CLElBQW5CLENBRHlCOztBQUd6QixpQkFBUyxHQUFULENBQWEsV0FBYixFQUh5QjtBQUl6QixjQUFNLFlBQVksU0FBUyxHQUFULENBQWEsV0FBYixDQUFaLENBSm1CO0FBS3pCLGNBQU0sWUFBWSxTQUFTLEdBQVQsQ0FBYSxXQUFiLENBQVosQ0FMbUI7O0FBT3pCLHlCQUFPLEtBQVAsQ0FBYSxTQUFiLEVBQXdCLFNBQXhCLEVBUHlCO09BQU4sQ0FBckIsQ0FEb0M7S0FBTixDQUFoQyxDQXBIc0M7R0FBTixDQUFsQyxDQTNDeUI7Q0FBTixDQUFyQiIsImZpbGUiOiJpbnRlcm5hbC9pb2MvcmVnaXN0cnkuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuaW1wb3J0IFJlZ2lzdHJ5IGZyb20gJy4vcmVnaXN0cnknO1xuXG5cbmxldCB0eXBlO1xubGV0IHJlZ2lzdHJ5O1xubGV0IG15Q29tcG9uZW50O1xuXG5kZXNjcmliZSgnUmVnaXN0cnknLCAoKSA9PiB7XG4gIGNsYXNzIE15Q29tcG9uZW50IHtcbiAgfVxuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHJlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5KCk7XG4gICAgdHlwZSA9IHtcbiAgICAgIHR5cGVOYW1lOiAnQ29tcG9uZW50JyxcbiAgICAgIGluamVjdFR5cGVXaGl0ZWxpc3Q6IFsnQ29tcG9uZW50J10sXG4gICAgfTtcbiAgICBteUNvbXBvbmVudCA9IHtcbiAgICAgIGlkOiAwLFxuICAgICAgZmFjdG9yeTogTXlDb21wb25lbnQsXG4gICAgICBuYW1lc3BhY2U6ICducycsXG4gICAgICBuYW1lOiAnbXknLFxuICAgICAgdHlwZSxcbiAgICAgIGRlcGVuZGVuY2llczoge30sXG4gICAgICBuZXdJbnN0YW5jZTogKCkgPT4gbmV3IE15Q29tcG9uZW50KCksXG4gICAgfTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2FkZGluZyBhIGNvbXBvbmVudCcsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHN1Y2NlZWQnLCAoKSA9PiB7XG4gICAgICByZWdpc3RyeS5hZGQobXlDb21wb25lbnQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBmYWlsIGZvciBhbHJlYWR5IGV4aXN0aW5nIElEJywgKCkgPT4ge1xuICAgICAgcmVnaXN0cnkuYWRkKG15Q29tcG9uZW50KTtcblxuICAgICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICAgKCkgPT4gcmVnaXN0cnkuYWRkKG15Q29tcG9uZW50KSxcbiAgICAgICAgKGVycikgPT4gZXJyLm1lc3NhZ2UgPT09ICdjYW4gbm90IHJlZ2lzdGVyIFxcJ215XFwnOiBhbHJlYWR5IHJlZ2lzdGVyZWQnKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0aGF0IGlzIGEgc2luZ2xldG9uJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBzdWNjZWVkJywgKCkgPT4ge1xuICAgICAgICB0eXBlLmlzU2luZ2xldG9uID0gdHJ1ZTtcblxuICAgICAgICByZWdpc3RyeS5hZGQobXlDb21wb25lbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZXNvbHZpbmcgYSBjb21wb25lbnQnLCAoKSA9PiB7XG4gICAgY2xhc3MgQ29tcG9uZW50QSB7fVxuICAgIGxldCBjb21wb25lbnRBO1xuXG4gICAgY2xhc3MgQ29tcG9uZW50QiB7fVxuICAgIGxldCBjb21wb25lbnRCO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBjb21wb25lbnRBID0ge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgZmFjdG9yeTogQ29tcG9uZW50QSxcbiAgICAgICAgbmFtZXNwYWNlOiAnbnMnLFxuICAgICAgICBuYW1lOiAnQScsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGRlcGVuZGVuY2llczoge30sXG4gICAgICAgIG5ld0luc3RhbmNlOiAoKSA9PiBuZXcgQ29tcG9uZW50QSgpLFxuICAgICAgfTtcbiAgICAgIGNvbXBvbmVudEIgPSB7XG4gICAgICAgIGlkOiAyLFxuICAgICAgICBmYWN0b3J5OiBDb21wb25lbnRCLFxuICAgICAgICBuYW1lc3BhY2U6ICducycsXG4gICAgICAgIG5hbWU6ICdCJyxcbiAgICAgICAgdHlwZSxcbiAgICAgICAgZGVwZW5kZW5jaWVzOiB7IGRlcGVuZGVuY3lBOiBjb21wb25lbnRBIH0sXG4gICAgICAgIG5ld0luc3RhbmNlOiAoKSA9PiBuZXcgQ29tcG9uZW50QigpLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc3VjY2VlZCBmb3IgY29tcG9uZW50IHdpdGhvdXQgZGVwZW5kZW5jaWVzJywgKCkgPT4ge1xuICAgICAgcmVnaXN0cnkuYWRkKG15Q29tcG9uZW50KTtcblxuICAgICAgY29uc3QgcmVzb2x2ZWQgPSByZWdpc3RyeS5nZXQobXlDb21wb25lbnQpO1xuXG4gICAgICBhc3NlcnQub2socmVzb2x2ZWQpO1xuICAgICAgYXNzZXJ0Lm9rKHJlc29sdmVkIGluc3RhbmNlb2YgTXlDb21wb25lbnQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzdWNjZWVkIGZvciBjb21wb25lbnQgd2l0aCBvbmUgZGlyZWN0IGRlcGVuZGVuY3knLCAoKSA9PiB7XG4gICAgICBteUNvbXBvbmVudC5kZXBlbmRlbmNpZXMgPSB7IGRlcGVuZGVuY3lBOiBjb21wb25lbnRBIH07XG5cbiAgICAgIHJlZ2lzdHJ5LmFkZChjb21wb25lbnRBKTtcbiAgICAgIHJlZ2lzdHJ5LmFkZChteUNvbXBvbmVudCk7XG4gICAgICBjb25zdCByZXNvbHZlZCA9IHJlZ2lzdHJ5LmdldChteUNvbXBvbmVudCk7XG5cbiAgICAgIGFzc2VydC5vayhyZXNvbHZlZCk7XG4gICAgICBhc3NlcnQub2socmVzb2x2ZWQuZGVwZW5kZW5jeUEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzdWNjZWVkIGZvciBjb21wb25lbnQgd2l0aCB0cmFuc2l0aXZlIGRlcGVuZGVuY2llcycsICgpID0+IHtcbiAgICAgIG15Q29tcG9uZW50LmRlcGVuZGVuY2llcyA9IHsgZGVwZW5kZW5jeUI6IGNvbXBvbmVudEIgfTtcblxuICAgICAgcmVnaXN0cnkuYWRkKGNvbXBvbmVudEEpO1xuICAgICAgcmVnaXN0cnkuYWRkKGNvbXBvbmVudEIpO1xuICAgICAgcmVnaXN0cnkuYWRkKG15Q29tcG9uZW50KTtcbiAgICAgIGNvbnN0IHJlc29sdmVkID0gcmVnaXN0cnkuZ2V0KG15Q29tcG9uZW50KTtcblxuICAgICAgYXNzZXJ0Lm9rKHJlc29sdmVkKTtcbiAgICAgIGFzc2VydC5vayhyZXNvbHZlZC5kZXBlbmRlbmN5Qik7XG4gICAgICBhc3NlcnQub2socmVzb2x2ZWQuZGVwZW5kZW5jeUIuZGVwZW5kZW5jeUEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBvbmx5IGNyZWF0ZSBlYWNoIGRlcGVuZGVuY3kgb25seSBvbmNlJywgKCkgPT4ge1xuICAgICAgbXlDb21wb25lbnQuZGVwZW5kZW5jaWVzID0ge1xuICAgICAgICBkZXBlbmRlbmN5QTogY29tcG9uZW50QSxcbiAgICAgICAgZGVwZW5kZW5jeUI6IGNvbXBvbmVudEIsXG4gICAgICB9O1xuXG4gICAgICByZWdpc3RyeS5hZGQoY29tcG9uZW50QSk7XG4gICAgICByZWdpc3RyeS5hZGQoY29tcG9uZW50Qik7XG4gICAgICByZWdpc3RyeS5hZGQobXlDb21wb25lbnQpO1xuICAgICAgY29uc3QgcmVzb2x2ZWQgPSByZWdpc3RyeS5nZXQobXlDb21wb25lbnQpO1xuXG4gICAgICBhc3NlcnQuZXF1YWwocmVzb2x2ZWQuZGVwZW5kZW5jeUIuZGVwZW5kZW5jeUEsIHJlc29sdmVkLmRlcGVuZGVuY3lBKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZmFpbCBmb3IgbWlzc2luZyBjb21wb25lbnQnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgICAoKSA9PiByZWdpc3RyeS5nZXQobXlDb21wb25lbnQpLFxuICAgICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gJ3VuYWJsZSB0byByZXNvbHZlIFxcJ015Q29tcG9uZW50XFwnOiBub3QgZm91bmQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZmFpbCBmb3IgbWlzc2luZyBkaXJlY3QgZGVwZW5kZW5jeScsICgpID0+IHtcbiAgICAgIG15Q29tcG9uZW50LmRlcGVuZGVuY2llcyA9IHsgZGVwZW5kZW5jeUE6IGNvbXBvbmVudEEgfTtcblxuICAgICAgcmVnaXN0cnkuYWRkKG15Q29tcG9uZW50KTtcblxuICAgICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICAgKCkgPT4gcmVnaXN0cnkuZ2V0KG15Q29tcG9uZW50KSxcbiAgICAgICAgKGVycikgPT4gZXJyLm1lc3NhZ2UgPT09ICd1bmFibGUgdG8gcmVzb2x2ZSBcXCdDb21wb25lbnRBXFwnOiBub3QgZm91bmQgKHRyYWNlOiBcXCdNeUNvbXBvbmVudFxcJyknKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZmFpbCBmb3IgbWlzc2luZyB0cmFuc2l0aXZlIGRlcGVuZGVuY3knLCAoKSA9PiB7XG4gICAgICBteUNvbXBvbmVudC5kZXBlbmRlbmNpZXMgPSB7IGRlcGVuZGVuY3lCOiBjb21wb25lbnRCIH07XG5cbiAgICAgIHJlZ2lzdHJ5LmFkZChjb21wb25lbnRCKTtcbiAgICAgIHJlZ2lzdHJ5LmFkZChteUNvbXBvbmVudCk7XG5cbiAgICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAgICgpID0+IHJlZ2lzdHJ5LmdldChteUNvbXBvbmVudCksXG4gICAgICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSAndW5hYmxlIHRvIHJlc29sdmUgXFwnQ29tcG9uZW50QVxcJzogbm90IGZvdW5kICh0cmFjZTogXFwnTXlDb21wb25lbnRcXCcgLT4gXFwnQ29tcG9uZW50QlxcJyknKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZmFpbCBmb3IgY2lyY3VsYXIgZGVwZW5kZW5jeScsICgpID0+IHtcbiAgICAgIG15Q29tcG9uZW50LmRlcGVuZGVuY2llcyA9IHsgZGVwZW5kZW5jeUI6IGNvbXBvbmVudEIgfTtcbiAgICAgIGNvbXBvbmVudEIuZGVwZW5kZW5jaWVzID0geyBkZXBlbmRlbmN5QTogY29tcG9uZW50QSB9O1xuICAgICAgY29tcG9uZW50QS5kZXBlbmRlbmNpZXMgPSB7IGRlcGVuZGVuY3lCOiBjb21wb25lbnRCIH07XG5cbiAgICAgIHJlZ2lzdHJ5LmFkZChjb21wb25lbnRBKTtcbiAgICAgIHJlZ2lzdHJ5LmFkZChjb21wb25lbnRCKTtcbiAgICAgIHJlZ2lzdHJ5LmFkZChteUNvbXBvbmVudCk7XG5cbiAgICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAgICgpID0+IHJlZ2lzdHJ5LmdldChteUNvbXBvbmVudCksXG4gICAgICAgIChlcnIpID0+IGVyci5tZXNzYWdlID09PSAndW5hYmxlIHRvIHJlc29sdmUgXFwnQ29tcG9uZW50QlxcJzogY2lyY3VsYXIgZGVwZW5kZW5jeSBcXCdNeUNvbXBvbmVudFxcJyAtPiBcXCdDb21wb25lbnRCXFwnIC0+IFxcJ0NvbXBvbmVudEFcXCcgLT4gXFwnQ29tcG9uZW50QlxcJycpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RoYXQgaXMgYSBzaW5nbGV0b24nLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHN1Y2NlZWQnLCAoKSA9PiB7XG4gICAgICAgIHR5cGUuaXNTaW5nbGV0b24gPSB0cnVlO1xuXG4gICAgICAgIHJlZ2lzdHJ5LmFkZChteUNvbXBvbmVudCk7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkMSA9IHJlZ2lzdHJ5LmdldChteUNvbXBvbmVudCk7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkMiA9IHJlZ2lzdHJ5LmdldChteUNvbXBvbmVudCk7XG5cbiAgICAgICAgYXNzZXJ0LmVxdWFsKHJlc29sdmVkMSwgcmVzb2x2ZWQyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
