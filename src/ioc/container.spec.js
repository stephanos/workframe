import assert from 'assert';
import where from 'data-driven';

import Container from './container';


describe('Container', () => {
  describe('registering a component', () => {
    it('should succeed', () => {
      class Component {
        get id() {
          return 'ID';
        }
      }

      const container = new Container();
      container.register(Component);

      assert.equal(container._componentByIds.ID, Component);
    });

    where([
      {value: 0}, {value: null}, {value: []}, {value: ''},
    ], () => {
      it('should fail for invalid Component', (ctx) => {
        const container = new Container();
        assert.throws(
          () => container.register(ctx.value),
          (err) => err.message === `can not register '${ctx.value}': invalid value`);
      });
    });

    it('should fail for Component without ID', () => {
      class Component {
      }

      const container = new Container();
      assert.throws(
        () => container.register(Component),
        (err) => err.message === "can not register 'Component': missing name");
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

        const container = new Container();
        assert.throws(
          () => container.register(Component),
          (err) => err.message === `can not register '${ctx.value}': invalid name`);
      });
    });

    it('should fail for already existing ID', () => {
      class Component {
        get id() {
          return 'ID';
        }
      }

      const container = new Container();
      container.register(Component);
      assert.throws(
        () => container.register(Component),
        (err) => err.message === `can not register 'ID': already exists`);
    });
  });
});
