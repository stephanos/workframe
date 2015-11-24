/* eslint camelcase:0 */
import assert from 'assert';
import sinon from 'sinon';

import ComponentFactory from './factory';


let factory;
let validateId;
let addToRegistry;

describe('Factory', () => {
  beforeEach(() => {
    addToRegistry = sinon.spy();
    validateId = sinon.stub().returns(true);

    factory = new ComponentFactory([{
      typeName: 'Component',
    }], {
      add: addToRegistry,
    }, {
      isValidId: validateId,
    });
  });

  it('should fail if type is unknown', () => {
    class Invalid {
    }

    assert.throws(
      () => factory.build(Invalid),
      (err) =>
        err.message === `unable to create component: type of 'Invalid' is unknown`);
  });

  it('should fail if ID has wrong format', () => {
    class Invalid_NameComponent {
      process(signal) {
        this.signal = signal;
      }
    }

    validateId.returns(false);

    assert.throws(
      () => factory.build(Invalid_NameComponent),
      (err) =>
        err.message === `unable to create component: ID 'Invalid_Name' has invalid format`);
  });

  it('should fail if "id" property exists already', () => {
    class MyComponent {

      static get id() {
        return 'my-id';
      }

      process(signal) {
        this.signal = signal;
      }
    }

    assert.throws(
      () => factory.build(MyComponent),
      (err) =>
        err.message === `unable to create component: property 'id' must not be defined`);
  });

  it('should add method that returns its "id"', () => {
    class MyComponent {
    }

    factory.build(MyComponent);

    assert.equal(MyComponent.id, 'My');
  });

  it('should fail if "namespace" property exists already', () => {
    class MyComponent {

      static get namespace() {
        return 'my-namspace';
      }

      process(signal) {
        this.signal = signal;
      }
    }

    assert.throws(
      () => factory.build(MyComponent),
      (err) =>
        err.message === `unable to create component: property 'namespace' must not be defined`);
  });

  it('should add method that returns its "namespace"', () => {
    class MyComponent {
    }

    factory.build(MyComponent, 'namespace');

    assert.equal(MyComponent.namespace, 'namespace');
  });

  it('should add method that returns a default "namespace" if none was specified', () => {
    class MyComponent {
    }

    factory.build(MyComponent);

    assert.equal(MyComponent.namespace, 'default');
  });

  it('should fail if "type" property exists already', () => {
    class MyComponent {

      static get type() {
        return 'my-type';
      }
    }

    assert.throws(
      () => factory.build(MyComponent),
      (err) =>
        err.message === `unable to create component: property 'type' must not be defined`);
  });

  it('should add method that returns its "type"', () => {
    class MyComponent {
    }

    factory.build(MyComponent);

    assert.equal(MyComponent.type, 'Component');
  });
});
