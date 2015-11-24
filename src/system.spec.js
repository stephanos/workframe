import assert from 'assert';

import SystemComponentType from './system';


describe('SystemComponentType', () => {
  it('should not allow any injectable types', () => {
    const allowedTypes = SystemComponentType.injectTypeWhitelist;
    assert.equal(allowedTypes.length, 0);
  });

  it('should be a singleton', () => {
    assert.ok(SystemComponentType.isSingleton);
  });

  describe('validation', () => {
    it('should always succeed', () => {
      class System {
      }

      SystemComponentType.verify(System);
    });
  });
});
