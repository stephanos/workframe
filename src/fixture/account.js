import {component} from '../index.js';


class UserMutator {

}
component()(UserMutator);


class UserLoader {

}
component()(UserLoader);


class AccountAccessor {
  access(signal) {
    this.signal = signal;
  }
}
component()(AccountAccessor);


class ChangeEmailProcessor {
  process(signal) {
    this.signal = signal;
  }
}
component()(ChangeEmailProcessor);
