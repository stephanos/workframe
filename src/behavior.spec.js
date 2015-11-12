import assert from 'assert';

import behavior from './behavior';
import {isComponent} from './util';


describe('Behavior', () => {
  it('should succeed', () => {
    class Behavior {
      process() {
      }
    }

    behavior('behavior', 'success')(Behavior);
    assert.ok(isComponent(Behavior));
  });

  it('should fail if "process" method missing', () => {
    class Behavior {
    }

    assert.throws(
      () => behavior('behavior', 'process')(Behavior),
      (err) => err.message === `method 'process' must be defined`);
  });
});
