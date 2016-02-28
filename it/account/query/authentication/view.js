/* @flow */

import { Record } from '../../../index';


@Record('accountAuthentication')
class AccountAuthenticationView {

  id: string;
  accountId: string;
  passwordHash: string;
}


export default AccountAuthenticationView;
