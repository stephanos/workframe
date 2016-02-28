/* @flow */

import assert from 'assert';
import ChangeEmailCommand from './account/command/changeEmail/command';
import CreateAccountCommand from './account/command/createAccount/command';


describe('Integration Test "Account"', () => {
  let app;

  after(() => {
    if (app) {
      app.terminate();
    }
  });

  it('should load', () => {
    app = require('./main.js').default;
  });

  it('should create account', async () => {
    const cmd = new CreateAccountCommand({
      id: '0',
      givenName: 'Arthur',
      familyName: 'Dent',
      emailAddress: 'arthur@earth.com',
    });

    const { result } = await app.dispatch(cmd);

    assert.deepEqual(result.toJS(), [{
      aggregate: {
        revision: 0,
      },
      command: {
        name: 'CreateAccountCommand',
        id: '0',
      },
      payload: {
        aggregateId: 'TODO',
        givenName: 'Arthur',
        familyName: 'Dent',
        emailAddress: 'arthur@earth.com',
      },
    }]);
  });

  // it('should handle query', () => {
  //   const { result } = app.dispatch(AccountAccessor, { accountId: '42' });
  //   assert.deepEqual(result, {
  //     name: 'Arthur Dent',
  //     email: 'arthur@earth.com',
  //   });
  // });

  // it('should change email address', async () => {
  //   const cmd = new ChangeEmailCommand({
  //     commandId: '1',
  //     aggregateId: '42',
  //     newEmailAddress: 'arthur@ship.com',
  //   });
  //
  //   const { result } = await app.dispatch(cmd);
  //
  //   assert.deepEqual(result.toJS(), [{
  //     aggregate: {
  //       revision: 0,
  //     },
  //     command: {
  //       name: 'ChangeEmailCommand',
  //       id: '1',
  //     },
  //     payload: {
  //       aggregateId: 'TODO',
  //       newEmailAddress: 'arthur@ship.com',
  //     },
  //   }]);
  // });
});
