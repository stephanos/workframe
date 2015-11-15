import assert from 'assert';
import sinon from 'sinon';

import ProcessorFactory from './processor';


let factory;
let componentFactory;

describe('ProcessorFactory', () => {
  beforeEach(() => {
    componentFactory = sinon.spy();
    factory = new ProcessorFactory({
      build: componentFactory,
    });
  });

  it('should succeed', () => {
    class Processor {
      process(signal) {
        this.signal = signal;
      }
    }

    factory.build(Processor, 'processorNS', 'build');

    assert.deepEqual(componentFactory.getCall(0).args[1], {
      injectTypeWhitelist: ['Behavior', 'Command', 'Processor', 'Query'],
      namespace: 'processorNS',
      type: 'Processor',
      id: 'build',
    });
  });

  it('should fail if "process" method missing', () => {
    class Processor {
    }

    assert.throws(
      () => factory.build(Processor, 'processorNS', undefined),
      (err) => err.message === `method 'process' must be defined`);
  });

  it('should fail if "process" method has less than 1 parameter', () => {
    class Processor {
      process() {
      }
    }

    assert.throws(
      () => factory.build(Processor, 'processorNS', undefined),
      (err) => err.message === `method 'process' must have exactly 1 parameter`);
  });

  it('should fail if "process" method has more than 1 parameter', () => {
    class Processor {
      process(one, two) {
        this.one = one;
        this.two = two;
      }
    }

    assert.throws(
      () => factory.build(Processor, 'processorNS', undefined),
      (err) => err.message === `method 'process' must have exactly 1 parameter`);
  });
});
