import { component, inject } from '../../src/index.js';
import { DatabaseSystem } from './database';

@component()
class UserViewer {

  @inject(DatabaseSystem)
  databaseSystem;

  getById(id) {
    return this.databaseSystem.getById('user', id);
  }
}


@component()
export class AccountAccessor {

  @inject(UserViewer)
  userViewer;

  access(signal) {
    return this.userViewer.getById(signal.userId);
  }
}
