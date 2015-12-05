import {component, inject} from '../../src/index.js';
import {DatabaseSystem} from './database';


class UserViewer {

  databaseSystem

  getById(id) {
    return this.databaseSystem.getById('user', id);
  }
}
inject(DatabaseSystem)(UserViewer, 'databaseSystem');
component()(UserViewer);


export class AccountAccessor {

  userViewer

  access(signal) {
    return this.userViewer.getById(signal.userId);
  }
}
inject(UserViewer)(AccountAccessor, 'userViewer');
component()(AccountAccessor);
