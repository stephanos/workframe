import { Component, Inject } from '../../src';
import { DatabaseSystem } from './database';


@Component()
class UserMutator {

  @Inject(DatabaseSystem)
  databaseSystem;

  setById(id, data) {
    return this.databaseSystem.setById('user', id, data);
  }
}


@Component()
export class ChangeEmailProcessor {

  @Inject(UserMutator)
  userMutator;

  process(signal) {
    this.userMutator.setById(signal.userId, { email: signal.newEmailAddress });
  }
}
