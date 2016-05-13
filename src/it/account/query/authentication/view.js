/* @flow */

import { Data } from '../../../../index';


@Data('accountAuthentication')
class AccountAuthenticationView {

  id: string;
  accountId: string;
  passwordHash: string;
}


export default AccountAuthenticationView;
