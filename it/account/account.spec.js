import { Application } from 'workframe';
import axios from 'axios';

import assert from 'assert';

describe('Integration Test "Account"', () => {
  let app;

  after(async () => {
    if (app) {
      await app.stop();
    }
  });

  it('should load', async () => {
    app = new Application(module);
    await app.init();
    await app.start();
  });

  it('should respond to HTTP requests', async () => {
    let resp;
    try {
      resp = await axios.get('http://localhost:9000/accounts/ping/hey');
    } catch (e) {
      console.log(e);
      throw new Error('request failed');
    }

    assert.equal(resp.status, 200);
    assert.equal(resp.data, '{ pong: hey }');
    assert.equal(resp.headers['content-type'], 'application/json');
  });

  it('should create account', async () => {
    let resp;
    try {
      resp = await axios.post('http://localhost:9000/accounts', {
        id: 'command-1',
        givenName: 'Arthur',
        familyName: 'Dent',
        emailAddress: 'arthur@earth.com',
      });
    } catch (e) {
      console.log(e);
      throw new Error('request failed');
    }

    assert.equal(resp.status, 204);

    // const { result } = await app.dispatch(cmd);
    //
    // assert.deepEqual(result.toJS(), [{
    //   aggregate: {
    //     revision: 0,
    //   },
    //   command: {
    //     name: 'CreateAccountCommand',
    //     id: '0',
    //   },
    //   payload: {
    //     aggregateId: 'TODO',
    //     givenName: 'Arthur',
    //     familyName: 'Dent',
    //     emailAddress: 'arthur@earth.com',
    //   },
    // }]);
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
