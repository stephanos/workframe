/* @flow */
/* eslint-disable */

import { Data } from '../../../../index';


@Data('emailChanged')
class EmailChangedEvent {

  aggregateId: string;

  newEmailAddress: string;
}


export default EmailChangedEvent;
