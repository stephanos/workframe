import assert from 'assert';

import ComponentValidator from './util';
import MutatorComponentType from './mutator';

describe('MutatorComponentType', () => {
  it('should whitelist allowed injectable types', () => {
    const allowedTypes = MutatorComponentType.injectTypeWhitelist;

    assert.ok(allowedTypes.length, 1);
    assert.ok((new ComponentValidator()).isValidInjectTypeWhitelist(allowedTypes));
  });

  describe('validation', () => {
    it('should always succeed', () => {
      class Loader {
      }

      MutatorComponentType.verify(Loader);
    });
  });
});
