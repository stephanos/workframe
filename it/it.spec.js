import assert from 'assert';
import AccountAccessor from './account/read/accountAccessor';
import ChangeEmailProcessor from './account/write/changeEmailProcessor';
import ChangeEmailCommand from './account/write/changeEmailCommand';


describe('Integration Test "Account"', () => {
  let app;

  after(() => {
    app.terminate();
  });

  it('should load', () => {
    app = require('./main.js').default;
  });

  it('should handle query', () => {
    const { result } = app.dispatch(AccountAccessor, { accountId: '42' });
    assert.deepEqual(result, {
      name: 'Arthur Dent',
      email: 'arthur@earth.com',
    });
  });

  it('should handle command', () => {
    const cmd = new ChangeEmailCommand();
    cmd.accountId = '42';
    cmd.newEmailAddress = 'arthur@ship.com';
    app.dispatch(ChangeEmailProcessor, cmd);

    const { result } = app.dispatch(AccountAccessor, { accountId: '42' });
    assert.deepEqual(result, {
      name: 'Arthur Dent',
      email: 'arthur@ship.com',
    });
  });
});
