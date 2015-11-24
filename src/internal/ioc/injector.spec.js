import assert from 'assert';
import sinon from 'sinon';

import Injector from './injector';


class Dependency {
  static _name = 'depId';
  static _type = 'Behavior';
  static _namespace = 'ns';
  static _injectTypeWhitelist = [];
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
      static _name = 'name';
      static _type = 'Processor';
      static _namespace = 'ns';
      static _injectTypeWhitelist = ['Behavior'];

      dependency = undefined;
    }

    injector.inject(Component, 'dependency', Dependency);

    assert.deepEqual(Component._dependencies,
      { 'dependency': {
        name: 'depId',
        type: 'Behavior',
        namespace: 'ns',
      }}
    );
  });

  it('should fail when an injected value is not a class ', () => {
    class Component {
      static _name = 'name';
      static _type = 'Behavior';
      static _namespace = 'ns';
      static _injectTypeWhitelist = ['Behavior'];
    }

    assert.throws(
      () => injector.inject(Component, 'dependency', 'nonsense'),
      (err) => err.message === `unable to inject 'nonsense' into 'dependency' of 'Component': not a function`);
  });

  it('should fail when a property was already injected', () => {
    class Component {
      static _name = 'name';
      static _type = 'Behavior';
      static _namespace = 'ns';
      static _injectTypeWhitelist = ['Behavior'];

      dependency = undefined;
    }

    injector.inject(Component, 'dependency', Dependency);
    assert.throws(
      () => injector.inject(Component, 'dependency', Dependency),
      (err) => err.message === `unable to inject into 'Component': conflicting dependency`);
  });

  it('should fail when an injected value is not a component', () => {
    class InvalidComponent {
      static _name = 'name';
      static _namespace = 'ns';
    }

    isValidComponent.withArgs(InvalidComponent).returns(false);

    assert.throws(
      () => injector.inject(InvalidComponent, 'dependency', Dependency),
      (err) => err.message === `unable to inject into any property of 'InvalidComponent': not a component`);
  });

  it('should fail when an injected value has forbidden type', () => {
    class Component {
      static _name = 'name';
      static _type = 'Behavior';
      static _namespace = 'ns';
      static _injectTypeWhitelist = [];
    }

    assert.throws(
      () => injector.inject(Component, 'dependency', Dependency),
      (err) => err.message === `unable to inject 'Dependency' into 'dependency' of 'Component': type 'Behavior' is not allowed`);
  });
});
