import assert from 'assert';

import processor from './processor';
import {isComponent} from './util';


describe('Processor', () => {
  it('should succeed', () => {
    class Processor {
      process(signal) {
        this.signal = signal;
      }
    }

    processor('processor', 'processorSuccess')(Processor);
    assert.ok(isComponent(Processor));
  });

  it('should only allow limited injectable types', () => {
    class Processor {
      process(signal) {
        this.signal = signal;
      }
    }

    processor('processor', 'processorInjection')(Processor);

    assert.deepEqual(Processor.injectTypeWhitelist,
      ['Behavior', 'Command', 'Processor', 'Query']);
  });

  it('should fail if "process" method missing', () => {
    class Processor {
    }

    assert.throws(
      () => processor('processor', undefined)(Processor),
      (err) => err.message === `method 'process' must be defined`);
  });

  it('should fail if "process" method has less than 1 parameter', () => {
    class Processor {
      process() {
      }
    }

    assert.throws(
      () => processor('processor', undefined)(Processor),
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
      () => processor('processor', undefined)(Processor),
      (err) => err.message === `method 'process' must have exactly 1 parameter`);
  });
});
