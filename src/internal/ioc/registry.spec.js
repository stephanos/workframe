import assert from 'assert';
import where from 'data-driven';

import Registry from './registry';


let registry;
let optsForComponent;

describe('Registry', () => {
  beforeEach(() => {
    registry = new Registry();

    optsForComponent = {
      namespace: 'ns',
      type: 'type',
      name: 'name',
    };
  });

  describe('adding a component', () => {
    it('should succeed', () => {
      class Component {
      }

      registry.add(Component, optsForComponent);
    });

    where([
      {value: 0}, {value: null}, {value: []}, {value: ''},
    ], () => {
      it('should fail for invalid Component', (ctx) => {
        assert.throws(
          () => registry.add(ctx.value, optsForComponent),
          (err) => err.message === `can not add '${ctx.value}': invalid value`);
      });
    });

    it('should fail for already existing ID', () => {
      class Component {
      }

      registry.add(Component, optsForComponent);

      assert.throws(
        () => registry.add(Component, optsForComponent),
        (err) => err.message === `can not register 'Component': 'ns:name:type' is already registered`);
    });

    describe('that is a singleton', () => {
      it('should succeed', () => {
        class Component {
        }
        optsForComponent.isSingleton = true;

        registry.add(Component, optsForComponent);
      });
    });
  });

  describe('resolving a component', () => {
    class DepA {
    }
    const optsForDepA = {
      namespace: 'ns',
      type: 'type',
      name: 'depA',
      dependencies: new Map(),
    };

    class DepB {
      dependencyA = null
    }
    const optsForDepB = {
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

      registry.add(Component, optsForComponent);

      assert.ok(registry.get('ns:name:type'));
    });

    it('should succeed for component with one direct dependency', () => {
      class Component {
        dependencyA
      }

      optsForComponent.dependencies = new Map([['dependencyA', {
        namespace: 'ns',
        type: 'type',
        name: 'depA',
      }]]);

      registry.add(DepA, optsForDepA);
      registry.add(Component, optsForComponent);
      const resolved = registry.get('ns:name:type');

      assert.ok(resolved);
      assert.ok(resolved.dependencyA);
    });

    it('should succeed for component with transitive dependencies', () => {
      class Component {
        dependencyB
      }

      optsForComponent.dependencies = new Map([['dependencyB', {
        namespace: 'ns',
        type: 'type',
        name: 'depB',
      }]]);

      registry.add(DepA, optsForDepA);
      registry.add(DepB, optsForDepB);
      registry.add(Component, optsForComponent);
      const resolved = registry.get('ns:name:type');

      assert.ok(resolved);
      assert.ok(resolved.dependencyB);
      assert.ok(resolved.dependencyB.dependencyA);
    });

    it('should only create each dependency once', () => {
      class Component {
        dependencyA = null
        dependencyB = null
      }

      optsForComponent.dependencies = new Map([
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

      registry.add(DepA, optsForDepA);
      registry.add(DepB, optsForDepB);
      registry.add(Component, optsForComponent);
      const resolved = registry.get('ns:name:type');

      assert.equal(resolved.dependencyB.dependencyA, resolved.dependencyA);
    });

    it('should fail for non-existing component', () => {
      assert.throws(
        () => registry.get('ns:type:missing'),
        (err) => err.message === `unable to resolve ID 'ns:type:missing': not found`);
    });

    it('should fail for non-existing direct dependency', () => {
      class Component {
        dependencyA = null
      }

      optsForComponent.dependencies = new Map([['dependencyA', {
        namespace: 'ns',
        type: 'type',
        name: 'depA',
      }]]);

      registry.add(Component, optsForComponent);

      assert.throws(
        () => registry.get('ns:name:type'),
        (err) => err.message === `unable to resolve ID 'ns:depA:type': not found (trace: 'ns:name:type')`);
    });

    it('should fail for non-existing transitive dependency', () => {
      class Component {
        dependencyB = null
      }

      optsForComponent.dependencies = new Map([['dependencyB', {
        namespace: 'ns',
        name: 'depB',
        type: 'type',
      }]]);

      registry.add(DepB, optsForDepB);
      registry.add(Component, optsForComponent);

      assert.throws(
        () => registry.get('ns:name:type'),
        (err) => err.message === `unable to resolve ID 'ns:depA:type': not found (trace: 'ns:name:type' -> 'ns:depB:type')`);
    });

    it('should fail for circular dependency', () => {
      class Component {
        dependencyB = null
      }

      optsForComponent.dependencies = new Map([['dependencyB', {
        namespace: 'ns',
        type: 'type',
        name: 'depB',
      }]]);

      optsForDepA.dependencies = new Map([['dependencyB', {
        namespace: 'ns',
        type: 'type',
        name: 'depB',
      }]]);

      registry.add(DepA, optsForDepA);
      registry.add(DepB, optsForDepB);
      registry.add(Component, optsForComponent);

      assert.throws(
        () => registry.get('ns:name:type'),
        (err) => err.message === `unable to resolve ID 'ns:depB:type': circular dependency 'ns:name:type' -> 'ns:depB:type' -> 'ns:depA:type' -> 'ns:depB:type'`);
    });

    describe('that is a singleton', () => {
      it('should succeed', () => {
        class Component {
        }
        optsForComponent.isSingleton = true;

        registry.add(Component, optsForComponent);
        const resolved1 = registry.get('ns:name:type');
        const resolved2 = registry.get('ns:name:type');

        assert.equal(resolved1, resolved2);
      });
    });
  });
});
