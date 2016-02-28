import assert from 'assert';

import BehaviorComponentType from './behavior';

describe('BehaviorComponentType', () => {
  it('should not allow any injectable types', () => {
    const allowedTypes = BehaviorComponentType.injectTypeWhitelist;
    assert.equal(allowedTypes.length, 0);
  });

  describe('validation', () => {
    it('should succeed', () => {
      class Behavior {
        behave() {}
      }

      BehaviorComponentType.verify(Behavior);
    });

    it('should fail if "behave" method missing', () => {
      class Behavior {}

      assert.throws(() => BehaviorComponentType.verify(Behavior), err => err.message === 'method \'behave\' must be defined');
    });
  });
});