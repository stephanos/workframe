/* @flow */
/* eslint-disable */

import { Component, Data } from '../../../../index';


@Data()
@Component('accountCreated')
class AccountCreatedEvent {

  aggregateId: string;

  givenName: string;
  familyName: string;
  emailAddress: string;
}


export default AccountCreatedEvent;
