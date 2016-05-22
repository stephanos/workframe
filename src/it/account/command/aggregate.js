/* @flow */

import { Record } from '../../../';


@Record('account')
class AccountAggregateRoot {

  id: string;
  emailAddress: string;
}


export default AccountAggregateRoot;
