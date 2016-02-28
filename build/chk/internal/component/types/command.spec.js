import assert from 'assert';

import CommandComponentType from './command';

describe('CommandComponentType', () => {
  it('should not allow any injectable types', () => {
    const allowedTypes = CommandComponentType.injectTypeWhitelist;
    assert.equal(allowedTypes.length, 0);
  });

  describe('validation', () => {
    it('should succeed', () => {
      class Command {}

      CommandComponentType.verify(Command);
    });
  });
});