/* @flow */

import { Data } from '../../../index';


@Data('account')
class AccountAggregateRoot {

  id: string;
  emailAddress: string;
}


export default AccountAggregateRoot;
