import assert from 'assert';
import ChangeEmailCommand from './change-email';


describe('Integration Test "Account"', () => {
  let app;
  let Accessor;
  let Processor;

  it('should load', () => {
    const ns = require('./main.js');

    app = ns.default;
    Accessor = ns.AccountAccessor;
    Processor = ns.ChangeEmailProcessor;
  });

  it('should handle query', () => {
    const { result } = app.dispatch(Accessor, { userId: '42' });
    assert.deepEqual(result, {
      name: 'Arthur Dent',
      email: 'arthur@earth.com',
    });
  });

  it('should handle command', () => {
    const cmd = new ChangeEmailCommand();
    cmd.userId = '42';
    cmd.newEmailAddress = 'arthur@ship.com';
    app.dispatch(Processor, cmd);

    const { result } = app.dispatch(Accessor, { userId: '42' });
    assert.deepEqual(result, {
      name: 'Arthur Dent',
      email: 'arthur@ship.com',
    });
  });
});
