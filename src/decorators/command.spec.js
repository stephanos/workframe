import assert from 'assert';

import command from './command';
import ComponentUtil from '../component';


describe('Command', () => {
  it('should succeed', () => {
    class Command {
    }

    command('command', 'success')(Command);
    assert.ok(ComponentUtil.isValid(Command));
  });
});
