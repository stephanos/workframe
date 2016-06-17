/* @flow */
/* eslint-disable */

import { Component, Record } from 'workframe';


@Record()
@Component('accountAuthentication')
class AccountAuthenticationView {

  id: string;
  accountId: string;
  passwordHash: string;
}


export default AccountAuthenticationView;
