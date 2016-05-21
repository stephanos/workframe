/* @flow */
/* eslint-disable */

import { Component, Data } from '../../../../../index';


@Data()
@Component('createAccount')
class CreateAccountCommand {

  id: string;
  givenName: string;
  familyName: string;
  emailAddress: string;
}


export default CreateAccountCommand;
