import {component, inject} from '../../../index.js';
import {DatabaseSystem} from './database';


class UserMutator {

  databaseSystem

}
component()(UserMutator);
inject(DatabaseSystem)(UserMutator, 'databaseSystem');


export class ChangeEmailProcessor {

  userMutator

  process(signal) {
    this.signal = signal;
  }
}
component()(ChangeEmailProcessor);
inject(UserMutator)(ChangeEmailProcessor, 'userMutator');
