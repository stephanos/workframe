/* @flow */

import { Record } from '../../index';


@Record('emailChanged')
class EmailChangedEvent {

  aggregateId: string;

  newEmailAddress: string;
}


export default EmailChangedEvent;
