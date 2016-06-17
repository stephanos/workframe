/* @flow */
/* eslint-disable */

import { Component, Record } from 'workframe';


@Record()
@Component('emailChanged')
class EmailChangedEvent {

  aggregateId: string;

  newEmailAddress: string;
}


export default EmailChangedEvent;
