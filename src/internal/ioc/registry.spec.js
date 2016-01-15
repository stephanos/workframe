import assert from 'assert';

import Registry from './registry';


let type;
let registry;
let myComponent;

describe('Registry', () => {
  class MyComponent {
  }

  beforeEach(() => {
    registry = new Registry();
    type = {
      typeName: 'Component',
      injectTypeWhitelist: ['Component'],
    };
    myComponent = {
      id: 0,
      factory: MyComponent,
      namespace: 'ns',
      name: 'my',
      type,
      dependencies: {},
      newInstance: () => new MyComponent(),
    };
  });

  describe('adding a component', () => {
    it('should succeed', () => {
      registry.add(myComponent);
    });

    it('should fail for already existing ID', () => {
      registry.add(myComponent);

      assert.throws(
        () => registry.add(myComponent),
        (err) => err.message === `can not register 'my': already registered`);
    });

    describe('that is a singleton', () => {
      it('should succeed', () => {
        type.isSingleton = true;

        registry.add(myComponent);
      });
    });
  });

  describe('resolving a component', () => {
    class ComponentA {}
    let componentA;

    class ComponentB {}
    let componentB;

    beforeEach(() => {
      componentA = {
        id: 1,
        factory: ComponentA,
        namespace: 'ns',
        name: 'A',
        type,
        dependencies: {},
        newInstance: () => new ComponentA(),
      };
      componentB = {
        id: 2,
        factory: ComponentB,
        namespace: 'ns',
        name: 'B',
        type,
        dependencies: { dependencyA: componentA },
        newInstance: () => new ComponentB(),
      };
    });

    it('should succeed for component without dependencies', () => {
      registry.add(myComponent);

      const resolved = registry.get(myComponent);

      assert.ok(resolved);
      assert.ok(resolved instanceof MyComponent);
    });

    it('should succeed for component with one direct dependency', () => {
      myComponent.dependencies = { dependencyA: componentA };

      registry.add(componentA);
      registry.add(myComponent);
      const resolved = registry.get(myComponent);

      assert.ok(resolved);
      assert.ok(resolved.dependencyA);
    });

    it('should succeed for component with transitive dependencies', () => {
      myComponent.dependencies = { dependencyB: componentB };

      registry.add(componentA);
      registry.add(componentB);
      registry.add(myComponent);
      const resolved = registry.get(myComponent);

      assert.ok(resolved);
      assert.ok(resolved.dependencyB);
      assert.ok(resolved.dependencyB.dependencyA);
    });

    it('should only create each dependency only once', () => {
      myComponent.dependencies = {
        dependencyA: componentA,
        dependencyB: componentB,
      };

      registry.add(componentA);
      registry.add(componentB);
      registry.add(myComponent);
      const resolved = registry.get(myComponent);

      assert.equal(resolved.dependencyB.dependencyA, resolved.dependencyA);
    });

    it('should fail for missing component', () => {
      assert.throws(
        () => registry.get(myComponent),
        (err) => err.message === `unable to resolve 'MyComponent': not found`);
    });

    it('should fail for missing direct dependency', () => {
      myComponent.dependencies = { dependencyA: componentA };

      registry.add(myComponent);

      assert.throws(
        () => registry.get(myComponent),
        (err) => err.message === `unable to resolve 'ComponentA': not found (trace: 'MyComponent')`);
    });

    it('should fail for missing transitive dependency', () => {
      myComponent.dependencies = { dependencyB: componentB };

      registry.add(componentB);
      registry.add(myComponent);

      assert.throws(
        () => registry.get(myComponent),
        (err) => err.message === `unable to resolve 'ComponentA': not found (trace: 'MyComponent' -> 'ComponentB')`);
    });

    it('should fail for circular dependency', () => {
      myComponent.dependencies = { dependencyB: componentB };
      componentB.dependencies = { dependencyA: componentA };
      componentA.dependencies = { dependencyB: componentB };

      registry.add(componentA);
      registry.add(componentB);
      registry.add(myComponent);

      assert.throws(
        () => registry.get(myComponent),
        (err) => err.message === `unable to resolve 'ComponentB': circular dependency 'MyComponent' -> 'ComponentB' -> 'ComponentA' -> 'ComponentB'`);
    });

    describe('that is a singleton', () => {
      it('should succeed', () => {
        type.isSingleton = true;

        registry.add(myComponent);
        const resolved1 = registry.get(myComponent);
        const resolved2 = registry.get(myComponent);

        assert.equal(resolved1, resolved2);
      });
    });
  });
});
