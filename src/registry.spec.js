import assert from 'assert';
import where from 'data-driven';

import Registry from './registry';


describe('Registry', () => {
  describe('adding a component', () => {
    it('should succeed', () => {
      class Component {
        get id() {
          return 'ID';
        }
      }

      const registry = new Registry();
      registry.add(Component);

      assert.equal(registry._componentByIds.ID, Component);
    });

    where([
      {value: 0}, {value: null}, {value: []}, {value: ''},
    ], () => {
      it('should fail for invalid Component', (ctx) => {
        const registry = new Registry();
        assert.throws(
          () => registry.add(ctx.value),
          (err) => err.message === `can not add '${ctx.value}': invalid value`);
      });
    });

    it('should fail for Component without ID', () => {
      class Component {
      }

      const registry = new Registry();
      assert.throws(
        () => registry.add(Component),
        (err) => err.message === "can not add 'Component': missing name");
    });

    where([
      {value: 0}, {value: null}, {value: []}, {value: ''},
    ], () => {
      it('should fail for invalid ID', (ctx) => {
        class Component {
          get id() {
            return ctx.value;
          }
        }

        const registry = new Registry();
        assert.throws(
          () => registry.add(Component),
          (err) => err.message === `can not add '${ctx.value}': invalid name`);
      });
    });

    it('should fail for already existing ID', () => {
      class Component {
        get id() {
          return 'ID';
        }
      }

      const registry = new Registry();
      registry.add(Component);
      assert.throws(
        () => registry.add(Component),
        (err) => err.message === `can not add 'ID': already exists`);
    });
  });
});
