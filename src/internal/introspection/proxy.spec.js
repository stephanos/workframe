import assert from 'assert';
import sinon from 'sinon';

import proxy from './proxy';


let collector;
let idGenerator;

describe('proxy', () => {
  beforeEach(() => {
    collector = {
      add: sinon.spy(),
    };
    idGenerator = sinon.stub().returns(101);
  });

  it('should still return original return value', () => {
    class Component {
      doSomething() {
        return 42;
      }
    }

    const instance = proxy(new Component(), idGenerator, collector);
    const ret = instance.doSomething();

    assert.equal(ret, 42);
  });

  it('should track method call', () => {
    class Component {
      doSomething() {
        return 42;
      }
    }

    const instance = proxy(new Component(), idGenerator, collector);
    instance.doSomething();

    assert.ok(collector.add.calledTwice);
    assert.deepEqual(collector.add.firstCall.args, [{
      id: 101,
      method: 'doSomething',
      arguments: [],
    }]);
    assert.deepEqual(collector.add.secondCall.args, [{
      id: 101,
      result: 42,
    }]);
  });

  it('should track method call with arguments', () => {
    class Component {
      doSomething() {
        return 42;
      }
    }

    const instance = proxy(new Component(), idGenerator, collector);
    instance.doSomething('arg1', 'arg2');

    assert.ok(collector.add.calledTwice);
    assert.deepEqual(collector.add.firstCall.args, [{
      id: 101,
      method: 'doSomething',
      arguments: ['arg1', 'arg2'],
    }]);
    assert.deepEqual(collector.add.secondCall.args, [{
      id: 101,
      result: 42,
    }]);
  });

  it('should not proxy any properties', () => {
    class Component {
      prop = 42;
    }

    const instance = proxy(new Component(), idGenerator, collector);
    const prop = instance.prop;

    assert.equal(collector.add.callCount, 0);
    assert.equal(prop, 42);
  });
});
