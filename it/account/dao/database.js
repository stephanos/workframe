import { Component, Inject, State } from '../../../src';


@Component()
class ConnectionState extends State {

  constructor() {
    super();
    super.update(null, (state) =>
      state.merge({
        user: {
          42: {
            name: 'Arthur Dent',
            email: 'arthur@earth.com',
          },
        },
      })
    );
  }

}


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
