import assert from 'assert';

import ComponentValidator from './util';
import SystemComponentType from './system';


describe('SystemComponentType', () => {
  it('should not allow any injectable types', () => {
    const allowedTypes = SystemComponentType.injectTypeWhitelist;
    assert.equal(allowedTypes.length, 0);
  });

  describe('validation', () => {
    it('should always succeed', () => {
      class System {
      }

      SystemComponentType.verify(System);
    });
  });
});
