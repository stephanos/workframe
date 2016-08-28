/* @flow */

import { Component, Record } from 'workframe';


@Record()
@Component('account')
class AccountAggregate {

  id: string;
  emailAddress: string;
}


export default AccountAggregate;
