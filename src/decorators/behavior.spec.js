import assert from 'assert';

import behavior from './behavior';
import ComponentUtil from '../component';


describe('Behavior', () => {
  it('should succeed', () => {
    class Behavior {
      process() {
      }
    }

    behavior('behavior', 'success')(Behavior);
    assert.ok(ComponentUtil.isValid(Behavior));
  });

  it('should fail if "process" method missing', () => {
    class Behavior {
    }

    assert.throws(
      () => behavior('behavior', 'process')(Behavior),
      (err) => err.message === `method 'process' must be defined`);
  });
});
