import { component, inject } from '../../src/index.js';
import { DatabaseSystem } from './database';


@component()
class UserMutator {

  @inject(DatabaseSystem)
  databaseSystem;

  setById(id, data) {
    return this.databaseSystem.setById('user', id, data);
  }
}


@component()
export class ChangeEmailProcessor {

  @inject(UserMutator)
  userMutator;

  process(signal) {
    this.userMutator.setById(signal.userId, { email: signal.newEmail });
  }
}
