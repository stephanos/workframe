/* @flow */

import { Record } from '../../index';


@Record('accountCreated')
class AccountCreatedEvent {

  aggregateId: string;

  givenName: string;
  familyName: string;
  emailAddress: string;
}


export default AccountCreatedEvent;
