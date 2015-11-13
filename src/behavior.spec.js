import assert from 'assert';

import behavior from './behavior';
import {isComponent} from './util';


describe('Behavior', () => {
  it('should succeed', () => {
    class Behavior {
      process() {
      }
    }

    behavior('behavior', 'behaviorSuccess')(Behavior);
    assert.ok(isComponent(Behavior));
  });

  it('should not allow any injection', () => {
    class Behavior {
      process() {
      }
    }

    behavior('behavior', 'behaviorInjection')(Behavior);
    assert.deepEqual(Behavior.injectTypeWhitelist, []);
  });

  it('should fail if "process" method missing', () => {
    class Behavior {
    }

    assert.throws(
      () => behavior('behavior', undefined)(Behavior),
      (err) => err.message === `method 'process' must be defined`);
  });
});
