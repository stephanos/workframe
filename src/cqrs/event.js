/* @flow */

import AggregatorRef from './aggregatorRef';


class Event {
  id: string;
  commandId: string;
  context: string;
  payload: string;

  name: string;
  version: string;

  // commit: {
//   id,
//   size,
//   sequence,
//   stamp,
// };

  aggregate: AggregatorRef;
}


export default Event;
