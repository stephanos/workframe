/* @flow */
/* eslint-disable */

import { Component, Data } from '../../../../index';


@Data()
@Component('emailChanged')
class EmailChangedEvent {

  aggregateId: string;

  newEmailAddress: string;
}


export default EmailChangedEvent;
