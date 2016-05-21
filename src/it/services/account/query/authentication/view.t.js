/* @flow */
/* eslint-disable */

import { Component, Record } from '../../../../../index';


@Record()
@Component('accountAuthentication')
class AccountAuthenticationView {

  id: string;
  accountId: string;
  passwordHash: string;
}


export default AccountAuthenticationView;
