import assert from 'assert';
import where from 'data-driven';

import ComponentValidator from './util';


const validator = new ComponentValidator();

describe('ComponentValidator', () => {
  describe('validation of a component', () => {
    it('should succeed for valid component', () => {
      class Component {
        static _name = 'name';
        static _type = 'Behavior';
        static _namespace = 'namsepace';
        static _injectTypeWhitelist = [];
      }

      assert.ok(validator.isComponent(Component));
    });

    it('should fail for component without name', () => {
      class Component {
        static _type = 'Behavior';
        static _namespace = 'namespace';
        static _injectTypeWhitelist = [];
      }

      assert.ok(!validator.isComponent(Component));
    });

    where([
      {value: 0}, {value: null}, {value: ''},
      {value: 'invalid-name'}, {value: 'invalid_name'}, {value: 'invalid:name'},
    ], () => {
      it('should fail for component with invalid name', (ctx) => {
        class Component {
          static _name = ctx.value;
          static _type = 'Behavior';
          static _namespace = 'namsepace';
          static _injectTypeWhitelist = [];
        }

        assert.ok(!validator.isComponent(Component));
      });
    });

    it('should fail for component without namespace', () => {
      class Component {
        static _name = 'name';
        static _type = 'Behavior';
        static _injectTypeWhitelist = [];
      }

      assert.ok(!validator.isComponent(Component));
    });

    where([
      {value: 0}, {value: null}, {value: ''},
      {value: 'invalid-ns'}, {value: 'invalid_ns'}, {value: 'invalid:ns'},
    ], () => {
      it('should fail for component with invalid namespace', (ctx) => {
        class Component {
          static _name = 'name';
          static _type = 'Behavior';
          static _namespace = ctx.value;
          static _injectTypeWhitelist = [];
        }

        assert.ok(!validator.isComponent(Component));
      });
    });

    it('should fail for component without type', () => {
      class Component {
        static _name = 'name';
        static _namespace = 'namespace';
        static _injectTypeWhitelist = [];
      }

      assert.ok(!validator.isComponent(Component));
    });

    it('should fail for component with invalid type', () => {
      class Component {
        static _name = 'name';
        static _type = 'invalid-type';
        static _namespace = 'namsepace';
        static _injectTypeWhitelist = [];
      }

      assert.ok(!validator.isComponent(Component));
    });
  });
});
