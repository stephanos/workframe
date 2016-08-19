/* @flow */

import Datastore from 'nedb';
import { List, fromJS } from 'immutable';

import Event from '../../event';
import AggregatorRef from '../../aggregatorRef';
import { IdGenerator, Clock } from '../../../util';


class MemoryStorage {

  db: Datastore;
  clock: Clock;
  idGenerator: IdGenerator;

  constructor(idGenerator: IdGenerator, clock: Clock) {
    this.db = new Datastore();
    this.clock = clock;
    this.idGenerator = idGenerator;
  }

  async connect() {
    return;
  }

  async disconnect() {
    return;
  }

  async addEvents(events: List<Event>) {
    return new Promise((resolve, reject) => {
      const serializedEvents =
        events.toJS().map((evt) => {
          const copy = Object.assign({}, evt);
          copy._id = evt.id; /* eslint no-underscore-dangle: 0 */
          return copy;
        });

      this.db.insert(serializedEvents, (err, newDocs) => {
        if (err) reject(err);
        else resolve(newDocs);
      });
    });
  }

  async getEventStream(ref: AggregatorRef) {
    return new Promise((resolve, reject) => {
      const query = {
        'aggregate.context': ref.context,
        'aggregate.name': ref.name,
        'aggregate.id': ref.id,
      };

      this.db.find(query).sort({ aggregate: { revision: 1 } }).exec((err, found) => {
        if (err) reject(err);
        else {
          const foundWithoutId = fromJS(found).map((evt) => evt.delete('_id'));
          resolve(foundWithoutId);
        }
      });
    });
  }
}


export default MemoryStorage;
