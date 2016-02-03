import { Component, Inject } from '../../../src';
import UserViewer from '../dao/user.viewer';


@Component()
export class AccountAccessor {

  @Inject(UserViewer)
  userViewer;

  access(signal) {
    return this.userViewer.getById(signal.userId);
  }
}
