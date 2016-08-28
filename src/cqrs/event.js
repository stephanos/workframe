/* @flow */

import Commit from './commit';
import AggregatorRef from './aggregatorRef';


class Event {
  id: string;
  name: string;
  version: string;
  context: string;
  commandId: string;
  payload: string;
  commit: Commit;
  aggregate: AggregatorRef;
}


export default Event;
