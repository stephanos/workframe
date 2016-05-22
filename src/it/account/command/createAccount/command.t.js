/* @flow */
/* eslint-disable */

import { Component, Record } from '../../';


@Record()
@Component('createAccount')
class CreateAccountCommand {

  id: string;
  givenName: string;
  familyName: string;
  emailAddress: string;
}


export default CreateAccountCommand;
