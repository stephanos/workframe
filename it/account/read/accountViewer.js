import { Component, Inject } from '../../../src';
import DatabaseSystem from '../data/database';


@Component()
class AccountViewer {

  @Inject(DatabaseSystem)
  databaseSystem;


  getById(id) {
    return this.databaseSystem.getById('account', id);
  }
}


export default AccountViewer;
