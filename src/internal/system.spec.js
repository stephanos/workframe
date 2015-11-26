import assert from 'assert';

import ComponentValidator from './util';
import SystemComponentType from './system';


describe('SystemComponentType', () => {
  it('should whitelist allowed injectable types', () => {
    const allowedTypes = SystemComponentType.injectTypeWhitelist;

    assert.deepEqual(allowedTypes, ['State']);
    assert.ok((new ComponentValidator()).isValidInjectTypeWhitelist(allowedTypes));
  });


  describe('validation', () => {
    it('should always succeed', () => {
      class System {
      }

      SystemComponentType.verify(System);
    });
  });
});
