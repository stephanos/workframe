import { Component, Inject } from '../../../src';
import DatabaseSystem from './database';


@Component()
class UserViewer {

  @Inject(DatabaseSystem)
  databaseSystem;


  getById(id) {
    return this.databaseSystem.getById('user', id);
  }
}


export default UserViewer;
