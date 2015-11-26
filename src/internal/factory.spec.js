/* eslint camelcase:0 */
import assert from 'assert';
import sinon from 'sinon';

import ComponentFactory from './factory';


let factory;
let validateName;
let validateComp;
let addToRegistry;

describe('Factory', () => {
  beforeEach(() => {
    addToRegistry = sinon.spy();
    validateComp = sinon.stub();
    validateName = sinon.stub().returns(true);

    factory = new ComponentFactory([{
      verify: validateComp,
      typeName: 'Component',
      injectTypeWhitelist: ['Component'],
    }], {
      add: addToRegistry,
    }, {
      isValidName: validateName,
    });
  });

  it('should fail if type verification fails', () => {
    class MyComponent {
    }

    validateComp.withArgs(MyComponent).throws(new Error('invalid'));

    assert.throws(
      () => factory.build(MyComponent),
      (err) => err.message === 'invalid');
  });

  it('should fail if type is unknown', () => {
    class Invalid {
    }

    assert.throws(
      () => factory.build(Invalid),
      (err) =>
        err.message === `unable to create component: type of 'Invalid' is unknown`);
  });

  it('should fail if name has wrong format', () => {
    class Invalid_NameComponent {
      process(signal) {
        this.signal = signal;
      }
    }

    validateName.withArgs('Invalid_Name').returns(false);

    assert.throws(
      () => factory.build(Invalid_NameComponent),
      (err) =>
        err.message === `unable to create component: name 'Invalid_Name' has invalid format`);
  });

  it('should fail if "id" property exists already', () => {
    class MyComponent {

      static get _name() {
        return 'my-name';
      }

      process(signal) {
        this.signal = signal;
      }
    }

    assert.throws(
      () => factory.build(MyComponent),
      (err) =>
        err.message === `unable to create component: property '_name' must not be defined`);
  });

  it('should add method that returns its "name"', () => {
    class MyComponent {
    }

    factory.build(MyComponent);

    assert.equal(MyComponent._name, 'My');
  });

  it('should fail if "namespace" property exists already', () => {
    class MyComponent {

      static get _namespace() {
        return 'my-namspace';
      }

      process(signal) {
        this.signal = signal;
      }
    }

    assert.throws(
      () => factory.build(MyComponent),
      (err) =>
        err.message === `unable to create component: property '_namespace' must not be defined`);
  });

  it('should add method that returns its "namespace"', () => {
    class MyComponent {
    }

    factory.build(MyComponent, 'namespace');

    assert.equal(MyComponent._namespace, 'namespace');
  });

  it('should add method that returns a default "namespace" if none was specified', () => {
    class MyComponent {
    }

    factory.build(MyComponent);

    assert.equal(MyComponent._namespace, 'default');
  });

  it('should fail if "type" property exists already', () => {
    class MyComponent {

      static get _type() {
        return 'my-type';
      }
    }

    assert.throws(
      () => factory.build(MyComponent),
      (err) =>
        err.message === `unable to create component: property '_type' must not be defined`);
  });

  it('should add method that returns its "type"', () => {
    class MyComponent {
    }

    factory.build(MyComponent);

    assert.equal(MyComponent._type, 'Component');
  });

  it('should fail if "_injectTypeWhitelist" property exists already', () => {
    class MyComponent {

      static get _injectTypeWhitelist() {
        return [];
      }
    }

    assert.throws(
      () => factory.build(MyComponent),
      (err) =>
        err.message === `unable to create component: property '_injectTypeWhitelist' must not be defined`);
  });

  it('should add method that returns its "injectTypeWhitelist"', () => {
    class MyComponent {
    }

    factory.build(MyComponent);

    assert.deepEqual(MyComponent._injectTypeWhitelist, ['Component']);
  });
});
