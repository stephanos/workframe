import assert from 'assert';

import ViewerDefinitionType from './viewer';


describe('ViewerDefinitionType', () => {
  it('should whitelist allowed injectable types', () => {
    const allowedTypes = ViewerDefinitionType.injectTypeWhitelist;

    assert.deepEqual(allowedTypes, ['System']);
  });

  describe('validation', () => {
    it('should always succeed', () => {
      class Viewer {
      }

      ViewerDefinitionType.verify(Viewer);
    });
  });
});
