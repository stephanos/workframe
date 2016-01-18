import assert from 'assert';

import AccessorComponentType from './accessor';


describe('AccessorComponentType', () => {
  it('should whitelist allowed injectable types', () => {
    const allowedTypes = AccessorComponentType.injectTypeWhitelist;

    assert.deepEqual(allowedTypes, ['Accessor', 'Behavior', 'Mutator', 'Viewer']);
  });

  describe('validation', () => {
    it('should succeed', () => {
      class Accessor {
        access(signal) {
          AccessorComponentType.signal = signal;
        }
      }

      AccessorComponentType.verify(Accessor);
    });

    it('should fail if "access" method missing', () => {
      class Accessor {
      }

      assert.throws(
        () => AccessorComponentType.verify(Accessor),
        (err) => err.message === `method 'access' must be defined`);
    });

    it('should fail if "access" method has less than 1 parameter', () => {
      class Accessor {
        access() {
        }
      }

      assert.throws(
        () => AccessorComponentType.verify(Accessor),
        (err) => err.message === `method 'access' must have exactly 1 parameter`);
    });

    it('should fail if "access" method has more than 1 parameter', () => {
      class Accessor {
        access(one, two) {
          this.one = one;
          this.two = two;
        }
      }

      assert.throws(
        () => AccessorComponentType.verify(Accessor),
        (err) => err.message === `method 'access' must have exactly 1 parameter`);
    });
  });
});
