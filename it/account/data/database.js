import { Component, Inject } from '../../../src';
import ConnectionState from './state';


@Component()
class DatabaseSystem {

  @Inject(ConnectionState)
  connectionState;


  getById(collection, id) {
    return this.connectionState.get().getIn([collection, id]).toJS();
  }

  setById(collection, id, data) {
    this.connectionState.update((db) => db.mergeDeepIn([collection, id], data));
  }
}


export default DatabaseSystem;
