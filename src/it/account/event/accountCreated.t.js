/* @flow */
/* eslint-disable */

import { Component, Record } from '../';


@Record()
@Component('accountCreated')
class AccountCreatedEvent {

  aggregateId: string;

  givenName: string;
  familyName: string;
  emailAddress: string;
}


export default AccountCreatedEvent;
