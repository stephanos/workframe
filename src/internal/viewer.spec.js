import assert from 'assert';

import ComponentValidator from './util';
import ViewerDefinitionType from './viewer';


describe('ViewerDefinitionType', () => {
  it('should whitelist allowed injectable types', () => {
    const allowedTypes = ViewerDefinitionType.injectTypeWhitelist;

    assert.deepEqual(allowedTypes, ['System']);
    assert.ok((new ComponentValidator()).isValidInjectTypeWhitelist(allowedTypes));
  });

  describe('validation', () => {
    it('should always succeed', () => {
      class Viewer {
      }

      ViewerDefinitionType.verify(Viewer);
    });
  });
});
