import assert from 'assert';
import sinon from 'sinon';

import Dispatcher from './dispatcher';

let dispatcher;
let collector;

describe('Dispatcher', () => {
  beforeEach(() => {
    collector = {
      add: sinon.spy()
    };

    const nextId = sinon.stub();
    nextId.onFirstCall().returns(1);
    nextId.onSecondCall().returns(2);
    const idGenerator = {
      next: nextId
    };

    const clock = {
      now: sinon.stub().returns(1234567890)
    };

    dispatcher = new Dispatcher(null, collector, idGenerator, clock);
  });

  describe('should invoke', () => {
    it('method', () => {
      let called;
      class Component {
        doSomething() {
          called = true;
        }
      }

      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, []);

      assert.ok(called);
    });

    it('method with for of dispatcher as first argument', () => {
      let args;
      class Component {
        doSomething() {
          args = arguments;
        }
      }

      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, []);

      assert.equal(args[0].id, 2);
      assert.equal(args[0].parentId, 1);
    });

    it('method and return its value', () => {
      class Component {
        doSomething() {
          return 42;
        }
      }

      const comp = new Component();
      const ret = dispatcher.invoke({}, comp, comp.doSomething, []);

      assert.equal(ret, 42);
    });

    it('method and yield thrown exception', () => {
      class Component {
        doSomething() {
          throw new Error('oops');
        }
      }

      const comp = new Component();
      assert.throws(() => dispatcher.invoke({}, comp, comp.doSomething, []), Error);
    });
  });

  describe('should track', () => {
    it('invocation call', () => {
      class Component {
        doSomething() {
          return 42;
        }
      }

      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, []);

      assert.deepEqual(collector.add.firstCall.args, [{
        id: 1,
        parentId: null,
        component: 'Component',
        method: 'doSomething',
        arguments: [],
        time: 1234567890
      }]);
    });

    it('invocation call with arguments', () => {
      class Component {
        doSomething() {
          return 42;
        }
      }

      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, ['arg1', 'arg2']);

      assert.deepEqual(collector.add.firstCall.args, [{
        id: 1,
        parentId: null,
        component: 'Component',
        method: 'doSomething',
        arguments: ['arg1', 'arg2'],
        time: 1234567890
      }]);
    });

    it('invocation result', () => {
      class Component {
        doSomething() {
          return 42;
        }
      }

      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, []);

      assert.deepEqual(collector.add.secondCall.args, [{
        id: 1,
        result: 42,
        time: 1234567890
      }]);
    });

    it('invocation exception', () => {
      class Component {
        doSomething() {
          throw new Error('oops');
        }
      }

      const comp = new Component();
      try {
        dispatcher.invoke({}, comp, comp.doSomething, []);
      } catch (err) {
        // ignore
      }

      assert.deepEqual(collector.add.secondCall.args, [{
        id: 1,
        error: new Error('oops'),
        time: 1234567890
      }]);
    });
  });
});