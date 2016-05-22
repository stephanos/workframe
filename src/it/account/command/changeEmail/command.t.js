/* @flow */
/* eslint-disable */

import { Component, Record } from '../../../../';


@Record()
@Component('changeEmail')
class ChangeEmailCommand {

  id: string;
  aggregateId: string;

  newEmailAddress: string;
}


export default ChangeEmailCommand;
