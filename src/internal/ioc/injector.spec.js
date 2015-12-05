import assert from 'assert';

import Injector from './injector';


class Dependency {
  static __id = 'my-dep';
}

let injector;

describe('inject', () => {
  beforeEach(() => {
    injector = new Injector();
  });

  it('should add dependency', () => {
    class MyComponent {
    }

    const component = injector.inject(MyComponent, 'dependency', Dependency);

    assert.deepEqual(Object.keys(component.dependencies), ['dependency']);
    assert.deepEqual(component.dependencies.dependency.factory, Dependency);
  });

  it('should fail when a property was already injected', () => {
    class MyComponent {
    }

    injector.inject(MyComponent, 'dependency', Dependency);

    assert.throws(
      () => injector.inject(MyComponent, 'dependency', Dependency),
      (err) => err.message === `unable to inject into 'dependency' of 'MyComponent': conflicting dependency`);
  });
});
