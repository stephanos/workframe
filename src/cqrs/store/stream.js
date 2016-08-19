/* @flow */

import Event from '../event';
import AggregatorRef from '../aggregatorRef';


class EventStream {

  aggregate: AggregatorRef;
  events: Event[];
}


export default EventStream;
