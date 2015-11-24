import {bootstrap, component, inject} from '../index.js';


class MongoDatabaseSystem {

}
component()(MongoDatabaseSystem);


class UserLoader {

  mongoDatabaseSystem

}
component()(UserLoader);
inject(MongoDatabaseSystem)(UserLoader, 'mongoDatabaseSystem');


class AccountAccessor {

  userLoader

  access(signal) {
    this.signal = signal;
  }
}
component()(AccountAccessor);
inject(UserLoader)(AccountAccessor, 'userLoader');


class UserMutator {

  mongoDatabaseSystem

}
component()(UserMutator);
inject(MongoDatabaseSystem)(UserMutator, 'mongoDatabaseSystem');


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
