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
    static verify = (c) => typeVerify(c);
    static isSingleton = true;
    static typeName = 'Component';
    static injectTypeWhitelist = ['Component'];
  }

  beforeEach(() => {
    typeVerify = sinon.stub();
    registry = {
      add: sinon.spy(),
    };
    validator = {
      validateName: sinon.stub(),
      validateNamespace: sinon.stub(),
      validateDependencies: sinon.stub(),
    };
    factory = new ComponentFactory([MyType], registry, validator);
  });

  describe('should create a component', () => {
    it('with correct name', () => {
      class MyComponent {}
      const component = factory.build(MyComponent);

      assert.equal(component.name, 'My');
    });

    it('with correct namespace', () => {
      class MyComponent {}
      const component = factory.build(MyComponent);

      assert.equal(component.namespace, 'default');
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

      assert.throws(
        () => factory.build(MyComponent),
        (err) => err.message === 'invalid');
    });

    it('when type is unknown', () => {
      class Invalid {}

      assert.throws(
        () => factory.build(Invalid),
        (err) =>
          err.message === `invalid component: not a known type`);
    });

    it('when namespace is invalid', () => {
      class MyComponent {}

      validator.validateName.throws(new Error('invalid namespace'));

      assert.throws(
        () => factory.build(MyComponent, 'invalid-namespace'),
        (err) => err.message === `invalid namespace`);
    });

    it('when name is invalid', () => {
      class Invalid_NameComponent {}

      validator.validateNamespace.throws(new Error('invalid name'));

      assert.throws(
        () => factory.build(Invalid_NameComponent),
        (err) => err.message === `invalid name`);
    });
  });

  // it('should fail when a dependency is not a component ', () => {
  //   class Dependency {
  //   }
  //
  //   class MyComponent {
  //     static __meta = fromJS({
  //       dependencies: { 'dependency': Dependency },
  //     });
  //   }
  //
  //   validateComp.withArgs(Dependency).returns(false);
  //
  //   assert.throws(
  //     () => factory.build(MyComponent),
  //     (err) =>
  //       err.message === `invalid dependency 'Dependency' of 'dependency' in 'MyComponent': not a component`);
  // });
  //
  // it('should fail when an injected value has forbidden type', () => {
  //   class Dependency {
  //     static __meta = fromJS({
  //       type: 'Invalid',
  //     });
  //   }
  //
  //   class MyComponent {
  //     static __meta = fromJS({
  //       dependencies: { 'dependency': Dependency },
  //     });
  //   }
  //
  //   assert.throws(
  //     () => factory.build(MyComponent),
  //     (err) =>
  //       err.message === `invalid dependency 'Dependency' of 'dependency' in 'MyComponent': type 'Invalid' is not allowed`);
  // });
});
