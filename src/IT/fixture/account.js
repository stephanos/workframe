import {bootstrap, component, inject, State} from '../../index.js';


class ConnectionState extends State {

}
component()(ConnectionState);


class DatabaseSystem {

  connectionState

}
component()(DatabaseSystem);
inject(ConnectionState)(DatabaseSystem, 'connectionState');


class UserViewer {

  databaseSystem

}
component()(UserViewer);
inject(DatabaseSystem)(UserViewer, 'databaseSystem');


class AccountAccessor {

  userViewer

  access(signal) {
    this.signal = signal;
  }
}
component()(AccountAccessor);
inject(UserViewer)(AccountAccessor, 'userViewer');


class UserMutator {

  databaseSystem

}
component()(UserMutator);
inject(DatabaseSystem)(UserMutator, 'databaseSystem');


class ChangeEmailProcessor {

  userMutator

  process(signal) {
    this.signal = signal;
  }
}
component()(ChangeEmailProcessor);
inject(UserMutator)(ChangeEmailProcessor, 'userMutator');


const App = bootstrap();
export default App;
