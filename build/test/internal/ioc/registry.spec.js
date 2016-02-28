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

      _assert2.default.throws(() => registry.add(myComponent), err => err.message === `can not register 'my': already registered`);
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
      _assert2.default.throws(() => registry.get(myComponent), err => err.message === `unable to resolve 'MyComponent': not found`);
    });

    it('should fail for missing direct dependency', () => {
      myComponent.dependencies = { dependencyA: componentA };

      registry.add(myComponent);

      _assert2.default.throws(() => registry.get(myComponent), err => err.message === `unable to resolve 'ComponentA': not found (trace: 'MyComponent')`);
    });

    it('should fail for missing transitive dependency', () => {
      myComponent.dependencies = { dependencyB: componentB };

      registry.add(componentB);
      registry.add(myComponent);

      _assert2.default.throws(() => registry.get(myComponent), err => err.message === `unable to resolve 'ComponentA': not found (trace: 'MyComponent' -> 'ComponentB')`);
    });

    it('should fail for circular dependency', () => {
      myComponent.dependencies = { dependencyB: componentB };
      componentB.dependencies = { dependencyA: componentA };
      componentA.dependencies = { dependencyB: componentB };

      registry.add(componentA);
      registry.add(componentB);
      registry.add(myComponent);

      _assert2.default.throws(() => registry.get(myComponent), err => err.message === `unable to resolve 'ComponentB': circular dependency 'MyComponent' -> 'ComponentB' -> 'ComponentA' -> 'ComponentB'`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2lvYy9yZWdpc3RyeS5zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBLElBQUksSUFBSjtBQUNBLElBQUksUUFBSjtBQUNBLElBQUksV0FBSjs7QUFFQSxTQUFTLFVBQVQsRUFBcUIsTUFBTTtNQUNuQixjQUFOLE1BQU0sV0FBTixDQUFrQixFQUFsQixDQUR5Qjs7O0FBSXpCLGFBQVcsTUFBTTtBQUNmLGVBQVcsd0JBQVgsQ0FEZTtBQUVmLFdBQU87QUFDTCxnQkFBVSxXQUFWO0FBQ0EsMkJBQXFCLENBQUMsV0FBRCxDQUFyQjtLQUZGLENBRmU7QUFNZixrQkFBYztBQUNaLFVBQUksQ0FBSjtBQUNBLGVBQVMsV0FBVDtBQUNBLGlCQUFXLElBQVg7QUFDQSxZQUFNLElBQU47QUFDQSxVQUxZO0FBTVosb0JBQWMsRUFBZDtBQUNBLG1CQUFhLE1BQU0sSUFBSSxXQUFKLEVBQU47S0FQZixDQU5lO0dBQU4sQ0FBWCxDQUp5Qjs7QUFxQnpCLFdBQVMsb0JBQVQsRUFBK0IsTUFBTTtBQUNuQyxPQUFHLGdCQUFILEVBQXFCLE1BQU07QUFDekIsZUFBUyxHQUFULENBQWEsV0FBYixFQUR5QjtLQUFOLENBQXJCLENBRG1DOztBQUtuQyxPQUFHLHFDQUFILEVBQTBDLE1BQU07QUFDOUMsZUFBUyxHQUFULENBQWEsV0FBYixFQUQ4Qzs7QUFHOUMsdUJBQU8sTUFBUCxDQUNFLE1BQU0sU0FBUyxHQUFULENBQWEsV0FBYixDQUFOLEVBQ0EsT0FBUyxJQUFJLE9BQUosS0FBZ0IsQ0FBQyx5Q0FBRCxDQUFoQixDQUZYLENBSDhDO0tBQU4sQ0FBMUMsQ0FMbUM7O0FBYW5DLGFBQVMscUJBQVQsRUFBZ0MsTUFBTTtBQUNwQyxTQUFHLGdCQUFILEVBQXFCLE1BQU07QUFDekIsYUFBSyxXQUFMLEdBQW1CLElBQW5CLENBRHlCOztBQUd6QixpQkFBUyxHQUFULENBQWEsV0FBYixFQUh5QjtPQUFOLENBQXJCLENBRG9DO0tBQU4s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YixDQUFOLEVBQ0EsT0FBUyxJQUFJLE9BQUosS0FBZ0IsQ0FBQyxpSEFBRCxDQUFoQixDQUZYLENBVDhDO0tBQU4sQ0FBMUMsQ0F0R3NDOztBQW9IdEMsYUFBUyxxQkFBVCxFQUFnQyxNQUFNO0FBQ3BDLFNBQUcsZ0JBQUgsRUFBcUIsTUFBTTtBQUN6QixhQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FEeUI7O0FBR3pCLGlCQUFTLEdBQVQsQ0FBYSxXQUFiLEVBSHlCO0FBSXpCLGNBQU0sWUFBWSxTQUFTLEdBQVQsQ0FBYSxXQUFiLENBQVosQ0FKbUI7QUFLekIsY0FBTSxZQUFZLFNBQVMsR0FBVCxDQUFhLFdBQWIsQ0FBWixDQUxtQjs7QUFPekIseUJBQU8sS0FBUCxDQUFhLFNBQWIsRUFBd0IsU0FBeEIsRUFQeUI7T0FBTixDQUFyQixDQURvQztLQUFOLENBQWhDLENBcEhzQztHQUFOLENBQWxDLENBM0N5QjtDQUFOLENBQXJCIiwiZmlsZSI6ImludGVybmFsL2lvYy9yZWdpc3RyeS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuXG5pbXBvcnQgUmVnaXN0cnkgZnJvbSAnLi9yZWdpc3RyeSc7XG5cblxubGV0IHR5cGU7XG5sZXQgcmVnaXN0cnk7XG5sZXQgbXlDb21wb25lbnQ7XG5cbmRlc2NyaWJlKCdSZWdpc3RyeScsICgpID0+IHtcbiAgY2xhc3MgTXlDb21wb25lbnQge1xuICB9XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgcmVnaXN0cnkgPSBuZXcgUmVnaXN0cnkoKTtcbiAgICB0eXBlID0ge1xuICAgICAgdHlwZU5hbWU6ICdDb21wb25lbnQnLFxuICAgICAgaW5qZWN0VHlwZVdoaXRlbGlzdDogWydDb21wb25lbnQnXSxcbiAgICB9O1xuICAgIG15Q29tcG9uZW50ID0ge1xuICAgICAgaWQ6IDAsXG4gICAgICBmYWN0b3J5OiBNeUNvbXBvbmVudCxcbiAgICAgIG5hbWVzcGFjZTogJ25zJyxcbiAgICAgIG5hbWU6ICdteScsXG4gICAgICB0eXBlLFxuICAgICAgZGVwZW5kZW5jaWVzOiB7fSxcbiAgICAgIG5ld0luc3RhbmNlOiAoKSA9PiBuZXcgTXlDb21wb25lbnQoKSxcbiAgICB9O1xuICB9KTtcblxuICBkZXNjcmliZSgnYWRkaW5nIGEgY29tcG9uZW50JywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgc3VjY2VlZCcsICgpID0+IHtcbiAgICAgIHJlZ2lzdHJ5LmFkZChteUNvbXBvbmVudCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGZhaWwgZm9yIGFscmVhZHkgZXhpc3RpbmcgSUQnLCAoKSA9PiB7XG4gICAgICByZWdpc3RyeS5hZGQobXlDb21wb25lbnQpO1xuXG4gICAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgICAoKSA9PiByZWdpc3RyeS5hZGQobXlDb21wb25lbnQpLFxuICAgICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gYGNhbiBub3QgcmVnaXN0ZXIgJ215JzogYWxyZWFkeSByZWdpc3RlcmVkYCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndGhhdCBpcyBhIHNpbmdsZXRvbicsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCcsICgpID0+IHtcbiAgICAgICAgdHlwZS5pc1NpbmdsZXRvbiA9IHRydWU7XG5cbiAgICAgICAgcmVnaXN0cnkuYWRkKG15Q29tcG9uZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncmVzb2x2aW5nIGEgY29tcG9uZW50JywgKCkgPT4ge1xuICAgIGNsYXNzIENvbXBvbmVudEEge31cbiAgICBsZXQgY29tcG9uZW50QTtcblxuICAgIGNsYXNzIENvbXBvbmVudEIge31cbiAgICBsZXQgY29tcG9uZW50QjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgY29tcG9uZW50QSA9IHtcbiAgICAgICAgaWQ6IDEsXG4gICAgICAgIGZhY3Rvcnk6IENvbXBvbmVudEEsXG4gICAgICAgIG5hbWVzcGFjZTogJ25zJyxcbiAgICAgICAgbmFtZTogJ0EnLFxuICAgICAgICB0eXBlLFxuICAgICAgICBkZXBlbmRlbmNpZXM6IHt9LFxuICAgICAgICBuZXdJbnN0YW5jZTogKCkgPT4gbmV3IENvbXBvbmVudEEoKSxcbiAgICAgIH07XG4gICAgICBjb21wb25lbnRCID0ge1xuICAgICAgICBpZDogMixcbiAgICAgICAgZmFjdG9yeTogQ29tcG9uZW50QixcbiAgICAgICAgbmFtZXNwYWNlOiAnbnMnLFxuICAgICAgICBuYW1lOiAnQicsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGRlcGVuZGVuY2llczogeyBkZXBlbmRlbmN5QTogY29tcG9uZW50QSB9LFxuICAgICAgICBuZXdJbnN0YW5jZTogKCkgPT4gbmV3IENvbXBvbmVudEIoKSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgZm9yIGNvbXBvbmVudCB3aXRob3V0IGRlcGVuZGVuY2llcycsICgpID0+IHtcbiAgICAgIHJlZ2lzdHJ5LmFkZChteUNvbXBvbmVudCk7XG5cbiAgICAgIGNvbnN0IHJlc29sdmVkID0gcmVnaXN0cnkuZ2V0KG15Q29tcG9uZW50KTtcblxuICAgICAgYXNzZXJ0Lm9rKHJlc29sdmVkKTtcbiAgICAgIGFzc2VydC5vayhyZXNvbHZlZCBpbnN0YW5jZW9mIE15Q29tcG9uZW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc3VjY2VlZCBmb3IgY29tcG9uZW50IHdpdGggb25lIGRpcmVjdCBkZXBlbmRlbmN5JywgKCkgPT4ge1xuICAgICAgbXlDb21wb25lbnQuZGVwZW5kZW5jaWVzID0geyBkZXBlbmRlbmN5QTogY29tcG9uZW50QSB9O1xuXG4gICAgICByZWdpc3RyeS5hZGQoY29tcG9uZW50QSk7XG4gICAgICByZWdpc3RyeS5hZGQobXlDb21wb25lbnQpO1xuICAgICAgY29uc3QgcmVzb2x2ZWQgPSByZWdpc3RyeS5nZXQobXlDb21wb25lbnQpO1xuXG4gICAgICBhc3NlcnQub2socmVzb2x2ZWQpO1xuICAgICAgYXNzZXJ0Lm9rKHJlc29sdmVkLmRlcGVuZGVuY3lBKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc3VjY2VlZCBmb3IgY29tcG9uZW50IHdpdGggdHJhbnNpdGl2ZSBkZXBlbmRlbmNpZXMnLCAoKSA9PiB7XG4gICAgICBteUNvbXBvbmVudC5kZXBlbmRlbmNpZXMgPSB7IGRlcGVuZGVuY3lCOiBjb21wb25lbnRCIH07XG5cbiAgICAgIHJlZ2lzdHJ5LmFkZChjb21wb25lbnRBKTtcbiAgICAgIHJlZ2lzdHJ5LmFkZChjb21wb25lbnRCKTtcbiAgICAgIHJlZ2lzdHJ5LmFkZChteUNvbXBvbmVudCk7XG4gICAgICBjb25zdCByZXNvbHZlZCA9IHJlZ2lzdHJ5LmdldChteUNvbXBvbmVudCk7XG5cbiAgICAgIGFzc2VydC5vayhyZXNvbHZlZCk7XG4gICAgICBhc3NlcnQub2socmVzb2x2ZWQuZGVwZW5kZW5jeUIpO1xuICAgICAgYXNzZXJ0Lm9rKHJlc29sdmVkLmRlcGVuZGVuY3lCLmRlcGVuZGVuY3lBKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgb25seSBjcmVhdGUgZWFjaCBkZXBlbmRlbmN5IG9ubHkgb25jZScsICgpID0+IHtcbiAgICAgIG15Q29tcG9uZW50LmRlcGVuZGVuY2llcyA9IHtcbiAgICAgICAgZGVwZW5kZW5jeUE6IGNvbXBvbmVudEEsXG4gICAgICAgIGRlcGVuZGVuY3lCOiBjb21wb25lbnRCLFxuICAgICAgfTtcblxuICAgICAgcmVnaXN0cnkuYWRkKGNvbXBvbmVudEEpO1xuICAgICAgcmVnaXN0cnkuYWRkKGNvbXBvbmVudEIpO1xuICAgICAgcmVnaXN0cnkuYWRkKG15Q29tcG9uZW50KTtcbiAgICAgIGNvbnN0IHJlc29sdmVkID0gcmVnaXN0cnkuZ2V0KG15Q29tcG9uZW50KTtcblxuICAgICAgYXNzZXJ0LmVxdWFsKHJlc29sdmVkLmRlcGVuZGVuY3lCLmRlcGVuZGVuY3lBLCByZXNvbHZlZC5kZXBlbmRlbmN5QSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGZhaWwgZm9yIG1pc3NpbmcgY29tcG9uZW50JywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICAgKCkgPT4gcmVnaXN0cnkuZ2V0KG15Q29tcG9uZW50KSxcbiAgICAgICAgKGVycikgPT4gZXJyLm1lc3NhZ2UgPT09IGB1bmFibGUgdG8gcmVzb2x2ZSAnTXlDb21wb25lbnQnOiBub3QgZm91bmRgKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZmFpbCBmb3IgbWlzc2luZyBkaXJlY3QgZGVwZW5kZW5jeScsICgpID0+IHtcbiAgICAgIG15Q29tcG9uZW50LmRlcGVuZGVuY2llcyA9IHsgZGVwZW5kZW5jeUE6IGNvbXBvbmVudEEgfTtcblxuICAgICAgcmVnaXN0cnkuYWRkKG15Q29tcG9uZW50KTtcblxuICAgICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICAgKCkgPT4gcmVnaXN0cnkuZ2V0KG15Q29tcG9uZW50KSxcbiAgICAgICAgKGVycikgPT4gZXJyLm1lc3NhZ2UgPT09IGB1bmFibGUgdG8gcmVzb2x2ZSAnQ29tcG9uZW50QSc6IG5vdCBmb3VuZCAodHJhY2U6ICdNeUNvbXBvbmVudCcpYCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGZhaWwgZm9yIG1pc3NpbmcgdHJhbnNpdGl2ZSBkZXBlbmRlbmN5JywgKCkgPT4ge1xuICAgICAgbXlDb21wb25lbnQuZGVwZW5kZW5jaWVzID0geyBkZXBlbmRlbmN5QjogY29tcG9uZW50QiB9O1xuXG4gICAgICByZWdpc3RyeS5hZGQoY29tcG9uZW50Qik7XG4gICAgICByZWdpc3RyeS5hZGQobXlDb21wb25lbnQpO1xuXG4gICAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgICAoKSA9PiByZWdpc3RyeS5nZXQobXlDb21wb25lbnQpLFxuICAgICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gYHVuYWJsZSB0byByZXNvbHZlICdDb21wb25lbnRBJzogbm90IGZvdW5kICh0cmFjZTogJ015Q29tcG9uZW50JyAtPiAnQ29tcG9uZW50QicpYCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGZhaWwgZm9yIGNpcmN1bGFyIGRlcGVuZGVuY3knLCAoKSA9PiB7XG4gICAgICBteUNvbXBvbmVudC5kZXBlbmRlbmNpZXMgPSB7IGRlcGVuZGVuY3lCOiBjb21wb25lbnRCIH07XG4gICAgICBjb21wb25lbnRCLmRlcGVuZGVuY2llcyA9IHsgZGVwZW5kZW5jeUE6IGNvbXBvbmVudEEgfTtcbiAgICAgIGNvbXBvbmVudEEuZGVwZW5kZW5jaWVzID0geyBkZXBlbmRlbmN5QjogY29tcG9uZW50QiB9O1xuXG4gICAgICByZWdpc3RyeS5hZGQoY29tcG9uZW50QSk7XG4gICAgICByZWdpc3RyeS5hZGQoY29tcG9uZW50Qik7XG4gICAgICByZWdpc3RyeS5hZGQobXlDb21wb25lbnQpO1xuXG4gICAgICBhc3NlcnQudGhyb3dzKFxuICAgICAgICAoKSA9PiByZWdpc3RyeS5nZXQobXlDb21wb25lbnQpLFxuICAgICAgICAoZXJyKSA9PiBlcnIubWVzc2FnZSA9PT0gYHVuYWJsZSB0byByZXNvbHZlICdDb21wb25lbnRCJzogY2lyY3VsYXIgZGVwZW5kZW5jeSAnTXlDb21wb25lbnQnIC0+ICdDb21wb25lbnRCJyAtPiAnQ29tcG9uZW50QScgLT4gJ0NvbXBvbmVudEInYCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndGhhdCBpcyBhIHNpbmdsZXRvbicsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCcsICgpID0+IHtcbiAgICAgICAgdHlwZS5pc1NpbmdsZXRvbiA9IHRydWU7XG5cbiAgICAgICAgcmVnaXN0cnkuYWRkKG15Q29tcG9uZW50KTtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQxID0gcmVnaXN0cnkuZ2V0KG15Q29tcG9uZW50KTtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQyID0gcmVnaXN0cnkuZ2V0KG15Q29tcG9uZW50KTtcblxuICAgICAgICBhc3NlcnQuZXF1YWwocmVzb2x2ZWQxLCByZXNvbHZlZDIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
