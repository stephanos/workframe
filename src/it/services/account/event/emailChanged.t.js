/* @flow */
/* eslint-disable */

import { Component, Record } from '../../../../index';


@Record()
@Component('emailChanged')
class EmailChangedEvent {

  aggregateId: string;

  newEmailAddress: string;
}


export default EmailChangedEvent;
