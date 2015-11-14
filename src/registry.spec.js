import assert from 'assert';
import where from 'data-driven';

import Registry from './registry';


let registry;

describe('Registry', () => {
  beforeEach(() => {
    registry = new Registry();
  });

  describe('adding a component', () => {
    it('should succeed', () => {
      class Component {
        static namespace = 'ns';
        static type = 'type';
        static id = 'id';
      }

      registry.add(Component);
      assert.equal(registry._componentByIds['ns:type:id'], Component);
    });

    where([
      {value: 0}, {value: null}, {value: []}, {value: ''},
    ], () => {
      it('should fail for invalid Component', (ctx) => {
        assert.throws(
          () => registry.add(ctx.value),
          (err) => err.message === `can not add '${ctx.value}': invalid value`);
      });
    });

    it('should fail for already existing ID', () => {
      class Component {
        static namespace = 'ns';
        static type = 'type';
        static id = 'id';
      }

      registry.add(Component);
      assert.throws(
        () => registry.add(Component),
        (err) => err.message === `can not register Component 'Component': already registered`);
    });
  });

  describe('resolving a component', () => {
    class DepA {
      static dependencies = new Map();
      static namespace = 'ns';
      static type = 'type';
      static id = 'depA';
    }

    class DepB {
      static dependencies = new Map([['dependencyA', {
        namespace: 'ns',
        type: 'type',
        id: 'depA',
      }]]);
      static namespace = 'ns';
      static type = 'type';
      static id = 'depB';

      dependencyA = null
    }

    it('should succeed for component without dependencies', () => {
      class Component {
        static dependencies = new Map();
        static namespace = 'ns';
        static type = 'type';
        static id = 'id';
      }

      registry.add(Component);
      assert.ok(registry.get('ns:type:id'));
    });

    it('should succeed for component with one direct dependency', () => {
      class Component {
        static dependencies = new Map([['dependencyA', {
          namespace: 'ns',
          type: 'type',
          id: 'depA',
        }]]);
        static namespace = 'ns';
        static type = 'type';
        static id = 'id';

        dependencyA = null
      }

      registry.add(DepA);
      registry.add(Component);
      const resolved = registry.get('ns:type:id');

      assert.ok(resolved);
      assert.ok(resolved.dependencyA);
    });

    it('should succeed for component with transitive dependencies', () => {
      class Component {
        static dependencies = new Map([['dependencyB', {
          namespace: 'ns',
          type: 'type',
          id: 'depB',
        }]]);
        static namespace = 'ns';
        static type = 'type';
        static id = 'id';

        dependencyB = null
      }

      registry.add(DepA);
      registry.add(DepB);
      registry.add(Component);
      const resolved = registry.get('ns:type:id');

      assert.ok(resolved);
      assert.ok(resolved.dependencyB);
      assert.ok(resolved.dependencyB.dependencyA);
    });

    it('should only create each dependency once', () => {
      class Component {
        static dependencies = new Map([
          ['dependencyA', {
            namespace: 'ns',
            type: 'type',
            id: 'depA',
          }],
          ['dependencyB', {
            namespace: 'ns',
            type: 'type',
            id: 'depB',
          }],
        ]);
        static namespace = 'ns';
        static type = 'type';
        static id = 'id';

        dependencyA = null
        dependencyB = null
      }

      registry.add(DepA);
      registry.add(DepB);
      registry.add(Component);
      const resolved = registry.get('ns:type:id');

      assert.equal(resolved.dependencyB.dependencyA, resolved.dependencyA);
    });

    it('should fail for non-existing component', () => {
      assert.throws(
        () => registry.get('ns:type:missing'),
        (err) => err.message === `unable to resolve Component for ID 'ns:type:missing': not found`);
    });

    it('should fail for non-existing direct dependency', () => {
      class Component {
        static dependencies = new Map([['dependencyA', {
          namespace: 'ns',
          type: 'type',
          id: 'depA',
        }]]);
        static namespace = 'ns';
        static type = 'type';
        static id = 'id';

        dependencyA = null
      }

      registry.add(Component);

      assert.throws(
        () => registry.get('ns:type:id'),
        (err) => err.message === `unable to resolve Component for ID 'ns:type:depA': not found (trace: 'ns:type:id')`);
    });

    it('should fail for non-existing transitive dependency', () => {
      class Component {
        static dependencies = new Map([['dependencyB', {
          namespace: 'ns',
          type: 'type',
          id: 'depB',
        }]]);
        static namespace = 'ns';
        static type = 'type';
        static id = 'id';

        dependencyB = null
      }

      registry.add(DepB);
      registry.add(Component);

      assert.throws(
        () => registry.get('ns:type:id'),
        (err) => err.message === `unable to resolve Component for ID 'ns:type:depA': not found (trace: 'ns:type:id' -> 'ns:type:depB')`);
    });

    it('should fail for circular dependency', () => {
      class DepALoop {
        static dependencies = new Map([['dependencyB', {
          namespace: 'ns',
          type: 'type',
          id: 'depB',
        }]]);
        static namespace = 'ns';
        static type = 'type';
        static id = 'depA';

        dependencyB = null
      }

      class Component {
        static dependencies = new Map([['dependencyB', {
          namespace: 'ns',
          type: 'type',
          id: 'depB',
        }]]);
        static namespace = 'ns';
        static type = 'type';
        static id = 'id';

        dependencyB = null
      }

      registry.add(DepALoop);
      registry.add(DepB);
      registry.add(Component);

      assert.throws(
        () => registry.get('ns:type:id'),
        (err) => err.message === `unable to resolve Component for ID 'ns:type:depB': circular dependency 'ns:type:id' -> 'ns:type:depB' -> 'ns:type:depA' -> 'ns:type:depB'`);
    });
  });
});
