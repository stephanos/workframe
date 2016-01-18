import assert from 'assert';

import MutatorComponentType from './mutator';


describe('MutatorComponentType', () => {
  it('should whitelist allowed injectable types', () => {
    const allowedTypes = MutatorComponentType.injectTypeWhitelist;

    assert.deepEqual(allowedTypes, ['System', 'Viewer']);
  });

  describe('validation', () => {
    it('should always succeed', () => {
      class Mutator {
      }

      MutatorComponentType.verify(Mutator);
    });
  });
});
