import assert from 'assert';
import sinon from 'sinon';

import Proxy from './proxy';


let proxy;
let collector;

describe('Proxy', () => {
  beforeEach(() => {
    collector = {
      add: sinon.spy(),
    };
    const idGenerator = {
      next: sinon.stub().returns(101),
    };
    const clock = {
      now: sinon.stub().returns(1234567890),
    };
    proxy = new Proxy(collector, idGenerator, clock);
  });

  it('should still return original return value', () => {
    class Component {
      doSomething() {
        return 42;
      }
    }

    const instance = proxy.wrap(new Component());
    const ret = instance.doSomething();

    assert.equal(ret, 42);
  });

  it('should still return original error', () => {
    class Component {
      doSomething() {
        throw new Error('oops');
      }
    }

    const instance = proxy.wrap(new Component());
    assert.throws(() => instance.doSomething(), Error);
  });

  it('should track method call', () => {
    class Component {
      doSomething() {
        return 42;
      }
    }

    const instance = proxy.wrap(new Component());
    instance.doSomething();

    assert.ok(collector.add.calledTwice);
    assert.deepEqual(collector.add.firstCall.args, [{
      id: 101,
      method: 'doSomething',
      arguments: [],
      time: 1234567890,
    }]);
    assert.deepEqual(collector.add.secondCall.args, [{
      id: 101,
      result: 42,
      time: 1234567890,
    }]);
  });

  it('should track error', () => {
    class Component {
      doSomething() {
        throw new Error('oops');
      }
    }

    const instance = proxy.wrap(new Component());

    try {
      instance.doSomething();
    } catch (err) {
      // ignore
    }

    assert.ok(collector.add.calledTwice);
    assert.deepEqual(collector.add.firstCall.args, [{
      id: 101,
      method: 'doSomething',
      arguments: [],
      time: 1234567890,
    }]);
    assert.deepEqual(collector.add.secondCall.args, [{
      id: 101,
      error: new Error('oops'),
      time: 1234567890,
    }]);
  });

  it('should track method call with arguments', () => {
    class Component {
      doSomething() {
        return 42;
      }
    }

    const instance = proxy.wrap(new Component());
    instance.doSomething('arg1', 'arg2');

    assert.ok(collector.add.calledTwice);
    assert.deepEqual(collector.add.firstCall.args, [{
      id: 101,
      method: 'doSomething',
      arguments: ['arg1', 'arg2'],
      time: 1234567890,
    }]);
    assert.deepEqual(collector.add.secondCall.args, [{
      id: 101,
      result: 42,
      time: 1234567890,
    }]);
  });

  it('should not proxy any properties', () => {
    class Component {
      prop = 42;
    }

    const instance = proxy.wrap(new Component());
    const prop = instance.prop;

    assert.equal(collector.add.callCount, 0);
    assert.equal(prop, 42);
  });
});
