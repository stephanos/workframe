import { Component, Inject } from '../../../src';
import DatabaseSystem from '../data/database';


@Component()
class AccountMutator {

  @Inject(DatabaseSystem)
  databaseSystem;


  setById(id, data) {
    return this.databaseSystem.setById('account', id, data);
  }
}


export default AccountMutator;
