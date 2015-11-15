import assert from 'assert';

import accessor from './accessor';
import {isComponent} from './util';


describe('Accessor', () => {
  it('should succeed', () => {
    class Accessor {
      access(signal) {
        this.signal = signal;
      }
    }

    accessor('accessor', 'accessorSuccess')(Accessor);
    assert.ok(isComponent(Accessor));
  });

  it('should only allow limited injectable types', () => {
    class Accessor {
      access(signal) {
        this.signal = signal;
      }
    }

    accessor('accessor', 'accessorInjection')(Accessor);

    assert.deepEqual(Accessor.injectTypeWhitelist,
      ['Accessor', 'Behavior', 'Command', 'Query']);
  });

  it('should fail if "access" method missing', () => {
    class Accessor {
    }

    assert.throws(
      () => accessor('accessor', undefined)(Accessor),
      (err) => err.message === `method 'access' must be defined`);
  });

  it('should fail if "accessor" method has less than 1 parameter', () => {
    class Accessor {
      access() {
      }
    }

    assert.throws(
      () => accessor('accessor', undefined)(Accessor),
      (err) => err.message === `method 'access' must have exactly 1 parameter`);
  });

  it('should fail if "accessor" method has more than 1 parameter', () => {
    class Accessor {
      access(one, two) {
        this.one = one;
        this.two = two;
      }
    }

    assert.throws(
      () => accessor('accessor', undefined)(Accessor),
      (err) => err.message === `method 'access' must have exactly 1 parameter`);
  });
});
