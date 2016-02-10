import { Component, Inject } from '../../../src';
import AccountViewer from './accountViewer';


@Component()
export class AccountAccessor {

  @Inject(AccountViewer)
  accountViewer;


  access(signal) {
    return this.accountViewer.getById(signal.accountId);
  }
}


export default AccountAccessor;
