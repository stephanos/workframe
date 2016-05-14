/* @flow */
/* eslint-disable */

import { Data } from '../../../../index';


@Data('accountCreated')
class AccountCreatedEvent {

  aggregateId: string;

  givenName: string;
  familyName: string;
  emailAddress: string;
}


export default AccountCreatedEvent;
