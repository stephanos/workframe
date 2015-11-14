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
});
