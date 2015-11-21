import {bootstrap, component, inject} from '../index.js';


class UserLoader {

}
component()(UserLoader);


class AccountAccessor {

  userLoader

  access(signal) {
    this.signal = signal;
  }
}
component()(AccountAccessor);
inject(UserLoader)(AccountAccessor, 'userLoader');


class UserMutator {

}
component()(UserMutator);


class ChangeEmailProcessor {

  userMutator

  process(signal) {
    this.signal = signal;
  }
}
component()(ChangeEmailProcessor);
inject(UserMutator)(ChangeEmailProcessor, 'userMutator');


const Conductr = bootstrap();
export default Conductr;
