/* eslint camelcase:0 */
import assert from 'assert';
import sinon from 'sinon';

import ComponentFactory from './factory';

let factory;
let typeVerify;
let validator;
let registry;

describe('Factory', () => {
  class MyType {
    static verify = c => typeVerify(c);
    static isSingleton = true;
    static typeName = 'Component';
    static injectTypeWhitelist = ['Component'];
  }

  beforeEach(() => {
    typeVerify = sinon.stub();
    registry = {
      add: sinon.spy()
    };
    validator = {
      validateName: sinon.stub(),
      validateNamespace: sinon.stub(),
      validateDependencies: sinon.stub()
    };
    factory = new ComponentFactory([MyType], registry, validator);
  });

  describe('should create a component', () => {
    it('with correct name', () => {
      class MyComponent {}
      const component = factory.build(MyComponent);

      assert.equal(component.name, 'My');
    });

    it('with correct type', () => {
      class MyComponent {}
      const component = factory.build(MyComponent);

      assert.equal(component.type, MyType);
    });

    it('with default dependencies', () => {
      class MyComponent {}
      const component = factory.build(MyComponent);

      assert.deepEqual(component.dependencies, {});
    });

    it('and add it to the registry', () => {
      class MyComponent {}
      const component = factory.build(MyComponent);

      assert.ok(registry.add.calledOnce);
      assert.deepEqual(registry.add.firstCall.args[0], component);
    });
  });

  describe('should fail to create a component', () => {
    it('when type verification fails', () => {
      class MyComponent {}

      typeVerify.withArgs(MyComponent).throws(new Error('invalid'));

      assert.throws(() => factory.build(MyComponent), err => err.message === 'invalid');
    });

    it('when type is unknown', () => {
      class Invalid {}

      assert.throws(() => factory.build(Invalid), err => err.message === 'invalid component: \'Invalid\' is not a known type');
    });

    it('when name is invalid', () => {
      class Invalid_NameComponent {}

      validator.validateName.throws(new Error('invalid name'));

      assert.throws(() => factory.build(Invalid_NameComponent), err => err.message === 'invalid name');
    });

    it('when dependencies are invalid', () => {
      class MyComponent {}

      validator.validateDependencies.throws(new Error('invalid dependencies'));

      assert.throws(() => factory.build(MyComponent), err => err.message === 'invalid dependencies');
    });
  });
});