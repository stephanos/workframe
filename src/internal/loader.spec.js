import assert from 'assert';

import ComponentValidator from './util';
import LoaderDefinitionType from './loader';


describe('LoaderDefinitionType', () => {
  it('should whitelist allowed injectable types', () => {
    const allowedTypes = LoaderDefinitionType.injectTypeWhitelist;

    assert.deepEqual(allowedTypes, ['System']);
    assert.ok((new ComponentValidator()).isValidInjectTypeWhitelist(allowedTypes));
  });

  describe('validation', () => {
    it('should always succeed', () => {
      class Loader {
      }

      LoaderDefinitionType.verify(Loader);
    });
  });
});
