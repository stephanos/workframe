import assert from 'assert';

import command from './command';
import {isComponent} from './util';


describe('Command', () => {
  it('should succeed', () => {
    class Command {
    }

    command('command', 'success')(Command);
    assert.ok(isComponent(Command));
  });
});
