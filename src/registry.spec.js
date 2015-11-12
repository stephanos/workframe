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
        static id = 'ID';
      }

      registry.add(Component);
      assert.equal(registry._componentByIds.ID, Component);
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

    it('should fail for Component without ID', () => {
      class Component {
      }

      assert.throws(
        () => registry.add(Component),
        (err) => err.message === "can not add 'Component': missing id");
    });

    where([
      {value: 0}, {value: null}, {value: []}, {value: ''},
    ], () => {
      it('should fail for invalid ID', (ctx) => {
        class Component {
          static id = ctx.value;
        }

        assert.throws(
          () => registry.add(Component),
          (err) => err.message === `can not add '${ctx.value}': invalid id`);
      });
    });

    it('should fail for already existing ID', () => {
      class Component {
        static id = 'ID';
      }

      registry.add(Component);
      assert.throws(
        () => registry.add(Component),
        (err) => err.message === `can not add 'ID': already exists`);
    });
  });
});
