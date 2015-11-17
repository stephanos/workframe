import {accessor, loader, mutator, processor} from '../index.js';


class UserMutator {

}
mutator('User')(UserMutator);

class UserLoader {

}
loader('User')(UserLoader);

class AccountAccessor {
  access(signal) {
    this.signal = signal;
  }
}
accessor('Account')(AccountAccessor);

class ChangeEmailProcessor {
  process(signal) {
    this.signal = signal;
  }
}
processor('ChangeEmail')(ChangeEmailProcessor);
