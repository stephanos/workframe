import assert from 'assert';

import createComponent from './factory';


describe('Factory', () => {
  it('should fail if suffix is missing', () => {
    class Invalid {
    }

    assert.throws(
      () => createComponent(Invalid, 'component', 'name', 'Component'),
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
      () => createComponent(Component, 'component', 'factory:id:conflict', 'Component'),
      (err) => err.message === `getter/property 'id' must not be defined`);
  });

  it('should add method that returns its "id"', () => {
    class Component {
    }

    createComponent(Component, 'component', 'factory:id', 'Component');
    assert.equal(Component.id, 'factory:id');
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
      () => createComponent(Component, 'component', 'factory:ns:conflict', 'Component'),
      (err) => err.message === `getter/property 'namespace' must not be defined`);
  });

  it('should add method that returns its "namespace"', () => {
    class Component {
    }

    createComponent(Component, 'component', 'factory:ns', 'Component');
    assert.equal(Component.namespace, 'component');
  });

  it('should add method that returns a default "namespace" if none was specified', () => {
    class Component {
    }

    createComponent(Component, 'id:default', undefined, 'Component');
    assert.equal(Component.namespace, 'default');
  });

  it('should fail if "type" property exists already', () => {
    class Component {

      static get type() {
        return 'my-type';
      }
    }

    assert.throws(
      () => createComponent(Component, 'component', 'factory:type:conflict', 'Component'),
      (err) => err.message === `getter/property 'type' must not be defined`);
  });

  it('should add method that returns its "type"', () => {
    class Component {
    }

    createComponent(Component, 'component', 'type', 'Component');
    assert.equal(Component.type, 'Component');
  });
});
