import {component, inject} from '../../../index.js';
import {DatabaseSystem} from './database';


class UserViewer {

  databaseSystem

}
component()(UserViewer);
inject(DatabaseSystem)(UserViewer, 'databaseSystem');


export class AccountAccessor {

  userViewer

  access(signal) {
    this.signal = signal;
  }
}
component()(AccountAccessor);
inject(UserViewer)(AccountAccessor, 'userViewer');
