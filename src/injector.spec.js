import assert from 'assert';
import sinon from 'sinon';

import Injector from './injector';


class Dependency {
  static id = 'depId';
  static type = 'Behavior';
  static namespace = 'ns';
  static injectTypeWhitelist = [];
}

let injector;
let isValidComponent;

describe('inject', () => {
  beforeEach(() => {
    isValidComponent = sinon.stub().returns(true);
    injector = new Injector({
      isComponent: isValidComponent,
    });
  });

  it('should add dependency', () => {
    class Component {
      static id = 'id';
      static type = 'Processor';
      static namespace = 'ns';
      static injectTypeWhitelist = ['Behavior'];

      dependency = undefined;
    }

    injector.inject(Dependency, Component, 'dependency');

    assert.deepEqual(Component.dependencies,
      { 'dependency': {
        id: 'depId',
        type: 'Behavior',
        namespace: 'ns',
      }}
    );
  });

  it('should fail when an injected value is not a class ', () => {
    class Component {
      static id = 'id';
      static type = 'Behavior';
      static namespace = 'ns';
      static injectTypeWhitelist = ['Behavior'];
    }

    assert.throws(
      () => injector.inject('nonsense', Component, 'dependency'),
      (err) => err.message === `unable to inject 'nonsense' into 'dependency' of 'Component': not a function`);
  });

  it('should fail when a property was already injected', () => {
    class Component {
      static id = 'id';
      static type = 'Behavior';
      static namespace = 'ns';
      static injectTypeWhitelist = ['Behavior'];

      dependency = undefined;
    }

    injector.inject(Dependency, Component, 'dependency');
    assert.throws(
      () => injector.inject(Dependency, Component, 'dependency'),
      (err) => err.message === `unable to inject into 'Component': conflicting dependency`);
  });

  it('should fail when an injected value is not a component', () => {
    class InvalidComponent {
      static id = 'id';
      static namespace = 'ns';
    }

    isValidComponent.withArgs(InvalidComponent).returns(false);

    assert.throws(
      () => injector.inject(Dependency, InvalidComponent, 'dependency'),
      (err) => err.message === `unable to inject into any property of 'InvalidComponent': not a component`);
  });

  it('should fail when an injected value has forbidden type', () => {
    class Component {
      static id = 'id';
      static type = 'Behavior';
      static namespace = 'ns';
      static injectTypeWhitelist = [];
    }

    assert.throws(
      () => injector.inject(Dependency, Component, 'dependency'),
      (err) => err.message === `unable to inject 'Dependency' into 'dependency' of 'Component': type 'Behavior' is not allowed`);
  });
});
