import assert from 'assert';

import BehaviorFactory from './behavior';


describe('BehaviorComponentType', () => {
  it('should not allow any injectable types', () => {
    const allowedTypes = BehaviorFactory.injectTypeWhitelist;
    assert.equal(allowedTypes.length, 0);
  });

  describe('validation', () => {
    it('should succeed', () => {
      class Behavior {
        behave() {
        }
      }

      BehaviorFactory.verify(Behavior);
    });

    it('should fail if "behave" method missing', () => {
      class Behavior {
      }

      assert.throws(
        () => BehaviorFactory.verify(Behavior),
        (err) => err.message === `method 'behave' must be defined`);
    });
  });
});
