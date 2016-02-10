import { Component, State } from '../../../src';


@Component()
class ConnectionState extends State {

  constructor() {
    super();
    super.update(null, (state) =>
      state.merge({
        account: {
          42: {
            name: 'Arthur Dent',
            email: 'arthur@earth.com',
          },
        },
      })
    );
  }
}


export default ConnectionState;
