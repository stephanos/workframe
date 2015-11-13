import assert from 'assert';

import command from './command';
import {isComponent} from './util';


describe('Command', () => {
  it('should succeed', () => {
    class Command {
    }

    command('command', 'commandSuccess')(Command);
    assert.ok(isComponent(Command));
  });

  it('should only allow limited injectable types', () => {
    class Command {
    }

    command('command', 'commandInjection')(Command);
    assert.deepEqual(Command.injectTypeWhitelist, ['Query']);
  });
});
