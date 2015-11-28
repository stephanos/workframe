import assert from 'assert';
import where from 'data-driven';

import Registry from './registry';


let registry;
let componentDescriptor;

describe('Registry', () => {
  beforeEach(() => {
    registry = new Registry();

    componentDescriptor = {
      namespace: 'ns',
      type: 'type',
      name: 'name',
    };
  });

  describe('adding a component', () => {
    it('should succeed', () => {
      class Component {
      }

      registry.add(Component, componentDescriptor);
    });

    where([
      {value: 0}, {value: null}, {value: []}, {value: ''},
    ], () => {
      it('should fail for invalid Component', (ctx) => {
        assert.throws(
          () => registry.add(ctx.value, componentDescriptor),
          (err) => err.message === `can not add '${ctx.value}': invalid value`);
      });
    });

    it('should fail for already existing ID', () => {
      class Component {
      }

      registry.add(Component, componentDescriptor);

      assert.throws(
        () => registry.add(Component, componentDescriptor),
        (err) => err.message === `can not register 'Component': 'ns:name:type' is already registered`);
    });

    describe('that is a singleton', () => {
      it('should succeed', () => {
        class Component {
        }
        componentDescriptor.isSingleton = true;

        registry.add(Component, componentDescriptor);
      });
    });
  });

  describe('resolving a component', () => {
    class DepA {
    }
    const descriptorDepA = {
      namespace: 'ns',
      type: 'type',
      name: 'depA',
      dependencies: new Map(),
    };

    class DepB {
      dependencyA = null
    }
    const descriptorDepB = {
      namespace: 'ns',
      type: 'type',
      name: 'depB',
      dependencies: new Map([['dependencyA', {
        namespace: 'ns',
        type: 'type',
        name: 'depA',
      }]]),
    };

    it('should succeed for component without dependencies', () => {
      class Component {
      }

      registry.add(Component, componentDescriptor);
      assert.ok(registry.get(componentDescriptor));
    });

    it('should succeed for component with one direct dependency', () => {
      class Component {
        dependencyA
      }

      componentDescriptor.dependencies = new Map([['dependencyA', {
        namespace: 'ns',
        type: 'type',
        name: 'depA',
      }]]);

      registry.add(DepA, descriptorDepA);
      registry.add(Component, componentDescriptor);
      const resolved = registry.get(componentDescriptor);

      assert.ok(resolved);
      assert.ok(resolved.dependencyA);
    });

    it('should succeed for component with transitive dependencies', () => {
      class Component {
        dependencyB
      }

      componentDescriptor.dependencies = new Map([['dependencyB', {
        namespace: 'ns',
        type: 'type',
        name: 'depB',
      }]]);

      registry.add(DepA, descriptorDepA);
      registry.add(DepB, descriptorDepB);
      registry.add(Component, componentDescriptor);
      const resolved = registry.get(componentDescriptor);

      assert.ok(resolved);
      assert.ok(resolved.dependencyB);
      assert.ok(resolved.dependencyB.dependencyA);
    });

    it('should only create each dependency once', () => {
      class Component {
        dependencyA = null
        dependencyB = null
      }

      componentDescriptor.dependencies = new Map([
        ['dependencyA', {
          namespace: 'ns',
          type: 'type',
          name: 'depA',
        }],
        ['dependencyB', {
          namespace: 'ns',
          type: 'type',
          name: 'depB',
        }],
      ]);

      registry.add(DepA, descriptorDepA);
      registry.add(DepB, descriptorDepB);
      registry.add(Component, componentDescriptor);
      const resolved = registry.get(componentDescriptor);

      assert.equal(resolved.dependencyB.dependencyA, resolved.dependencyA);
    });

    it('should fail for non-existing component', () => {
      assert.throws(
        () => registry.get(componentDescriptor),
        (err) => err.message === `unable to resolve ID 'ns:name:type': not found`);
    });

    it('should fail for non-existing direct dependency', () => {
      class Component {
        dependencyA = null
      }

      componentDescriptor.dependencies = new Map([['dependencyA', {
        namespace: 'ns',
        type: 'type',
        name: 'depA',
      }]]);

      registry.add(Component, componentDescriptor);

      assert.throws(
        () => registry.get(componentDescriptor),
        (err) => err.message === `unable to resolve ID 'ns:depA:type': not found (trace: 'ns:name:type')`);
    });

    it('should fail for non-existing transitive dependency', () => {
      class Component {
        dependencyB = null
      }

      componentDescriptor.dependencies = new Map([['dependencyB', {
        namespace: 'ns',
        name: 'depB',
        type: 'type',
      }]]);

      registry.add(DepB, descriptorDepB);
      registry.add(Component, componentDescriptor);

      assert.throws(
        () => registry.get(componentDescriptor),
        (err) => err.message === `unable to resolve ID 'ns:depA:type': not found (trace: 'ns:name:type' -> 'ns:depB:type')`);
    });

    it('should fail for circular dependency', () => {
      class Component {
        dependencyB = null
      }

      componentDescriptor.dependencies = new Map([['dependencyB', {
        namespace: 'ns',
        type: 'type',
        name: 'depB',
      }]]);

      descriptorDepA.dependencies = new Map([['dependencyB', {
        namespace: 'ns',
        type: 'type',
        name: 'depB',
      }]]);

      registry.add(DepA, descriptorDepA);
      registry.add(DepB, descriptorDepB);
      registry.add(Component, componentDescriptor);

      assert.throws(
        () => registry.get(componentDescriptor),
        (err) => err.message === `unable to resolve ID 'ns:depB:type': circular dependency 'ns:name:type' -> 'ns:depB:type' -> 'ns:depA:type' -> 'ns:depB:type'`);
    });

    describe('that is a singleton', () => {
      it('should succeed', () => {
        class Component {
        }
        componentDescriptor.isSingleton = true;

        registry.add(Component, componentDescriptor);
        const resolved1 = registry.get(componentDescriptor);
        const resolved2 = registry.get(componentDescriptor);

        assert.equal(resolved1, resolved2);
      });
    });
  });
});
