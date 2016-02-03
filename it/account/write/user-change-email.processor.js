import { Component, Inject } from '../../../src';
import UserMutator from '../dao/user.mutator';


@Component()
export class ChangeEmailProcessor {

  @Inject(UserMutator)
  userMutator;

  process(signal) {
    this.userMutator.setById(signal.userId, { email: signal.newEmailAddress });
  }
}
