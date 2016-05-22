/* @flow */

import { Data } from '../';


@Data('account')
class AccountAggregateRoot {

  id: string;
  emailAddress: string;
}


export default AccountAggregateRoot;
