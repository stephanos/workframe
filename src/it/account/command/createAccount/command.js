/* @flow */

import { Data } from '../../../../index';


@Data('createAccount')
class CreateAccountCommand {

  id: string;
  givenName: string;
  familyName: string;
  emailAddress: string;
}


export default CreateAccountCommand;
