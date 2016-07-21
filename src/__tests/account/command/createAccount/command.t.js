/* @flow */

import { Component, Record } from 'workframe';


@Record()
@Component('createAccount')
class CreateAccountCommand {

  id: string;
  givenName: string;
  familyName: string;
  emailAddress: string;
}


export default CreateAccountCommand;
