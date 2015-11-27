import assert from 'assert';

import ComponentValidator from './util';
import MutatorComponentType from './mutator';


describe('MutatorComponentType', () => {
  it('should whitelist allowed injectable types', () => {
    const allowedTypes = MutatorComponentType.injectTypeWhitelist;

    assert.deepEqual(allowedTypes, ['System', 'Viewer']);
    assert.ok((new ComponentValidator()).isValidInjectTypeWhitelist(allowedTypes));
  });

  describe('validation', () => {
    it('should always succeed', () => {
      class Mutator {
      }

      MutatorComponentType.verify(Mutator);
    });
  });
});
