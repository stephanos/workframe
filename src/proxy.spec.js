import assert from 'assert';

import proxy from './proxy';


describe('Proxy', () => {
  it('should add a tracking property for calls', () => {
    class Component {
      doSomething() {
      }
    }

    const instance = proxy(new Component());
    assert.deepEqual(instance.calls, []);
  });

  it('should track method call', () => {
    class Component {
      doSomething() {
      }
    }

    const instance = proxy(new Component());
    instance.doSomething();

    assert.deepEqual(instance.calls, [{
      method: 'doSomething',
      arguments: [],
    }]);
  });

  it('should track method call with arguments', () => {
    class Component {
      doSomething() {
      }
    }

    const instance = proxy(new Component());
    instance.doSomething('arg1', 'arg2');

    assert.deepEqual(instance.calls, [{
      method: 'doSomething',
      arguments: ['arg1', 'arg2'],
    }]);
  });

  it('should not proxy any properties', () => {
    class Component {
      prop = 42;
    }

    const instance = proxy(new Component());
    const prop = instance.prop;

    assert.deepEqual(instance.calls, []);
    assert.equal(prop, 42);
  });
});
