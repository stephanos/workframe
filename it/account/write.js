import { component, inject } from '../../src/index.js';
import { DatabaseSystem } from './database';


@component()
class UserMutator {

  @inject(DatabaseSystem)
  databaseSystem

}


@component()
export class ChangeEmailProcessor {

  @inject(UserMutator)
  userMutator

  process(signal) {
    this.signal = signal;
  }
}
