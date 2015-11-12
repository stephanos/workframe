import assert from 'assert';
import where from 'data-driven';

import {isComponent} from './util';


describe('Util', () => {
  describe('validation of a component', () => {
    it('should succeed for valid component', () => {
      class Component {
        static id = 'id';
        static type = 'Behavior';
        static namespace = 'namsepace';
      }

      assert.ok(isComponent(Component));
    });

    it('should fail for component without id', () => {
      class Component {
        static type = 'Behavior';
        static namespace = 'namespace';
      }

      assert.ok(!isComponent(Component));
    });

    where([
      {value: 0}, {value: null}, {value: ''},
      {value: 'invalid-id'}, {value: 'invalid_id'}, {value: 'invalid:id'},
    ], () => {
      it('should fail for component with invalid id', (ctx) => {
        class Component {
          static id = ctx.value;
          static type = 'Behavior';
          static namespace = 'namsepace';
        }

        assert.ok(!isComponent(Component));
      });
    });

    it('should fail for component without namespace', () => {
      class Component {
        static id = 'id';
        static type = 'Behavior';
      }

      assert.ok(!isComponent(Component));
    });

    where([
      {value: 0}, {value: null}, {value: ''},
      {value: 'invalid-ns'}, {value: 'invalid_ns'}, {value: 'invalid:ns'},
    ], () => {
      it('should fail for component with invalid namespace', (ctx) => {
        class Component {
          static id = 'id';
          static type = 'Behavior';
          static namespace = ctx.value;
        }

        assert.ok(!isComponent(Component));
      });
    });

    it('should fail for component without type', () => {
      class Component {
        static id = 'id';
        static namespace = 'namespace';
      }

      assert.ok(!isComponent(Component));
    });

    it('should fail for component with invalid type', () => {
      class Component {
        static id = 'id';
        static type = 'invalid-type';
        static namespace = 'namsepace';
      }

      assert.ok(!isComponent(Component));
    });
  });
});
