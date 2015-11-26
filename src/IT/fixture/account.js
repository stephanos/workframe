import {bootstrap, component, inject, State} from '../../index.js';


class ConnectionState extends State {

}
component()(ConnectionState);


class DatabaseSystem {

  connectionState

}
component()(DatabaseSystem);
inject(ConnectionState)(DatabaseSystem, 'connectionState');


class UserLoader {

  databaseSystem

}
component()(UserLoader);
inject(DatabaseSystem)(UserLoader, 'databaseSystem');


class AccountAccessor {

  userLoader

  access(signal) {
    this.signal = signal;
  }
}
component()(AccountAccessor);
inject(UserLoader)(AccountAccessor, 'userLoader');


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
