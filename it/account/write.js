import {component, inject} from '../../src/index.js';
import {DatabaseSystem} from './database';


class UserMutator {

  databaseSystem

}
inject(DatabaseSystem)(UserMutator, 'databaseSystem');
component()(UserMutator);


export class ChangeEmailProcessor {

  userMutator

  process(signal) {
    this.signal = signal;
  }
}
inject(UserMutator)(ChangeEmailProcessor, 'userMutator');
component()(ChangeEmailProcessor);
