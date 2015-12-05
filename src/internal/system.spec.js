import assert from 'assert';

import SystemComponentType from './system';


describe('SystemComponentType', () => {
  it('should whitelist allowed injectable types', () => {
    const allowedTypes = SystemComponentType.injectTypeWhitelist;

    assert.deepEqual(allowedTypes, ['State']);
  });


  describe('validation', () => {
    it('should always succeed', () => {
      class System {
      }

      SystemComponentType.verify(System);
    });
  });
});
