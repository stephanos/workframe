/* @flow */
/* eslint-disable */

import { Data } from '../../../../../index';


@Data()
@Component('accountAuthentication')
class AccountAuthenticationView {

  id: string;
  accountId: string;
  passwordHash: string;
}


export default AccountAuthenticationView;
