/* @flow */
/* eslint-disable */

import { Component, Record } from '../../../../../index';


@Record()
@Component('createAccount')
class CreateAccountCommand {

  id: string;
  givenName: string;
  familyName: string;
  emailAddress: string;
}


export default CreateAccountCommand;
