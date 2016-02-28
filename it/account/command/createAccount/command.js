/* @flow */

import { Record } from '../../../index';


@Record('createAccount')
class CreateAccountCommand {

  id: string;
  givenName: string;
  familyName: string;
  emailAddress: string;
}


export default CreateAccountCommand;
