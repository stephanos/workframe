/* @flow */

import { Record } from 'workframe';


@Record('account')
class AccountAggregateRoot {

  id: string;
  emailAddress: string;
}


export default AccountAggregateRoot;
