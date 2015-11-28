import {component, inject, State} from '../../../index.js';


class ConnectionState extends State {}
component()(ConnectionState);


export class DatabaseSystem {

  connectionState

}
component()(DatabaseSystem);
inject(ConnectionState)(DatabaseSystem, 'connectionState');
