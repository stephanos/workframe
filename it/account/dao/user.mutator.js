import { Component, Inject } from '../../../src';
import DatabaseSystem from './database';


@Component()
class UserMutator {

  @Inject(DatabaseSystem)
  databaseSystem;


  setById(id, data) {
    return this.databaseSystem.setById('user', id, data);
  }
}


export default UserMutator;
