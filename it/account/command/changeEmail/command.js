/* @flow */

import { Record } from '../../../index';


@Record('changeEmail')
class ChangeEmailCommand {

  id: string;
  aggregateId: string;

  newEmailAddress: string;
}


export default ChangeEmailCommand;
