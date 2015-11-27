import assert from 'assert';
import sinon from 'sinon';

import proxy from './proxy';


let collect;

describe('proxy', () => {
  beforeEach(() => {
    collect = sinon.spy();
  });

  it('should still return original return value', () => {
    class Component {
      doSomething() {
        return 42;
      }
    }

    const instance = proxy(new Component(), {
      add: collect,
    });
    const ret = instance.doSomething();

    assert.equal(ret, 42);
  });

  it('should track method call', () => {
    class Component {
      doSomething() {
      }
    }

    const instance = proxy(new Component(), {
      add: collect,
    });
    instance.doSomething();

    assert.ok(collect.calledOnce);
    assert.deepEqual(collect.lastCall.args, [{
      method: 'doSomething',
      arguments: [],
    }]);
  });

  it('should track method call with arguments', () => {
    class Component {
      doSomething() {
        return 42;
      }
    }

    const instance = proxy(new Component(), {
      add: collect,
    });
    instance.doSomething('arg1', 'arg2');

    assert.ok(collect.calledOnce);
    assert.deepEqual(collect.lastCall.args, [{
      method: 'doSomething',
      arguments: ['arg1', 'arg2'],
    }]);
  });

  it('should not proxy any properties', () => {
    class Component {
      prop = 42;
    }

    const instance = proxy(new Component(), {
      add: collect,
    });
    const prop = instance.prop;

    assert.equal(collect.callCount, 0);
    assert.equal(prop, 42);
  });
});
