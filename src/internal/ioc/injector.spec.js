/* eslint no-unused-vars: 0 */
import assert from 'assert';

import Injector from './injector';
import Component from '../component/component';


class MyDependency {
  static __id = 'my-dep';
}

describe('inject', () => {
  it('should add dependency', () => {
    class MyComponent {

      @Injector.inject(MyDependency)
      dependency;
    }

    const comp = new Component(MyComponent);
    assert.deepEqual(Object.keys(comp.dependencies), ['dependency']);
    assert.deepEqual(comp.dependencies.dependency.factory, MyDependency);
  });

  it('should fail when a property was already injected', () => {
    assert.throws(() => {
      class MyComponent {

        @Injector.inject(MyDependency)
        @Injector.inject(MyDependency)
        dependency;
      }
    });
  });
});
