/* @flow */
/* eslint-disable */

import { Component, Record } from 'workframe';


@Record()
@Component('changeEmail')
class ChangeEmailCommand {

  id: string;
  aggregateId: string;

  newEmailAddress: string;
}


export default ChangeEmailCommand;
