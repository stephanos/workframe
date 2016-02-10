import { Component, Inject } from '../../../src';
import AccountMutator from './accountMutator';


@Component()
export class ChangeEmailProcessor {

  @Inject(AccountMutator)
  accountMutator;


  process(signal) {
    this.accountMutator.setById(signal.accountId,
      { email: signal.newEmailAddress }
    );
  }
}


export default ChangeEmailProcessor;
