/* @flow */
/* eslint-disable */

import { Component, Data } from '../../../../../index';


@Data()
@Component('changeEmail')
class ChangeEmailCommand {

  id: string;
  aggregateId: string;

  newEmailAddress: string;
}


export default ChangeEmailCommand;
