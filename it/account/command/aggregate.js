/* @flow */

import { Record } from '../../index';


@Record('account')
class AccountAggregateRoot {

  id: string;
  emailAddress: string;
}


export default AccountAggregateRoot;
