import assert from 'assert';

import ProcessorComponentType from './processor';


describe('ProcessorComponentType', () => {
  it('should whitelist allowed injectable types', () => {
    const allowedTypes = ProcessorComponentType.injectTypeWhitelist;

    assert.deepEqual(allowedTypes, ['Behavior', 'Mutator', 'Processor', 'Viewer']);
  });

  describe('validation', () => {
    it('should succeed', () => {
      class Processor {
        process(signal) {
          this.signal = signal;
        }
      }

      ProcessorComponentType.verify(Processor);
    });

    it('should fail if "process" method missing', () => {
      class Processor {
      }

      assert.throws(
        () => ProcessorComponentType.verify(Processor),
        (err) => err.message === `method 'process' must be defined`);
    });

    it('should fail if "process" method has less than 1 parameter', () => {
      class Processor {
        process() {
        }
      }

      assert.throws(
        () => ProcessorComponentType.verify(Processor),
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
        () => ProcessorComponentType.verify(Processor),
        (err) => err.message === `method 'process' must have exactly 1 parameter`);
    });
  });
});
