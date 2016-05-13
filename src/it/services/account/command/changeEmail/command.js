/* @flow */

import { Data } from '../../../../../index';


@Data('changeEmail')
class ChangeEmailCommand {

  id: string;
  aggregateId: string;

  newEmailAddress: string;
}


export default ChangeEmailCommand;
