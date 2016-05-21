/* @flow */
/* eslint-disable */

import { Component, Record } from '../../../../../index';


@Record()
@Component('changeEmail')
class ChangeEmailCommand {

  id: string;
  aggregateId: string;

  newEmailAddress: string;
}


export default ChangeEmailCommand;
