import assert from 'assert';

import ComponentUtil from './component';


describe('Component', () => {
  describe('validation', () => {
    it('should succeed for valid component', () => {
      class Behavior {
        static id = 'my-id';
        static type = 'my-type';
        static namespace = 'my-ns';
      }

      assert.ok(ComponentUtil.isValid(Behavior));
    });

    it('should fail for input without id', () => {
      class Behavior {
        static type = 'my-type';
        static namespace = 'my-ns';
      }

      assert.ok(!ComponentUtil.isValid(Behavior));
    });

    it('should fail for input without namespace', () => {
      class Behavior {
        static id = 'my-id';
        static type = 'my-type';
      }

      assert.ok(!ComponentUtil.isValid(Behavior));
    });

    it('should fail for input without type', () => {
      class Behavior {
        static id = 'my-id';
        static namespace = 'my-ns';
      }

      assert.ok(!ComponentUtil.isValid(Behavior));
    });
  });

  describe('creation', () => {
    it('should fail if suffix is missing', () => {
      class Invalid {
      }

      assert.throws(
        () => ComponentUtil.create(Invalid, 'component', 'name', 'Component'),
        (err) => err.message === `class must have suffix 'Component'`);
    });

    it('should fail if "id" property exists already', () => {
      class Component {

        static get id() {
          return 'my-id';
        }

        process(signal) {
          this.signal = signal;
        }
      }

      assert.throws(
        () => ComponentUtil.create(Component, 'component', 'id:conflict', 'Component'),
        (err) => err.message === `getter/property 'id' must not be defined`);
    });

    it('should add method that returns its "id"', () => {
      class Component {
      }

      ComponentUtil.create(Component, 'component', 'id', 'Component');
      assert.equal(Component.id, 'id');
    });

    it('should fail if "namespace" property exists already', () => {
      class Component {

        static get namespace() {
          return 'my-namspace';
        }

        process(signal) {
          this.signal = signal;
        }
      }

      assert.throws(
        () => ComponentUtil.create(Component, 'component', 'ns:conflict', 'Component'),
        (err) => err.message === `getter/property 'namespace' must not be defined`);
    });

    it('should add method that returns its "namespace"', () => {
      class Component {
      }

      ComponentUtil.create(Component, 'component', 'ns', 'Component');
      assert.equal(Component.namespace, 'component');
    });

    it('should add method that returns a default "namespace" if none was specified', () => {
      class Component {
      }

      ComponentUtil.create(Component, 'id', undefined, 'Component');
      assert.equal(Component.namespace, 'default');
    });

    it('should fail if "type" property exists already', () => {
      class Component {

        static get type() {
          return 'my-type';
        }
      }

      assert.throws(
        () => ComponentUtil.create(Component, 'component', 'type:conflict', 'Component'),
        (err) => err.message === `getter/property 'type' must not be defined`);
    });

    it('should add method that returns its "type"', () => {
      class Component {
      }

      ComponentUtil.create(Component, 'component', 'type', 'Component');
      assert.equal(Component.type, 'Component');
    });
  });
});
