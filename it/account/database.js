import {component, inject, State} from '../../src/index.js';


class ConnectionState extends State {

  constructor() {
    super();
    this.update((state) => {
      return state.merge({
        'user': {
          42: {
            name: 'Arthur Dent',
            email: 'arthur@earth.com',
          },
        },
      });
    });
  }

}
component()(ConnectionState);


export class DatabaseSystem {

  connectionState

  getById(collection, id) {
    return this.connectionState.get().getIn([collection, id]).toJS();
  }
}
component()(DatabaseSystem);
inject(ConnectionState)(DatabaseSystem, 'connectionState');
