/* @flow */

import Datastore from 'nedb';
import { List, fromJS } from 'immutable';

import Event from '../../event';
import AggregatorRef from '../../aggregatorRef';
import { IdGenerator, Clock } from '../../../util';
import { Component, OnStart } from '../../../container';


@Component()
class MemoryStorage {

  db: Datastore;
  clock = Clock;
  idGenerator = IdGenerator;

  @OnStart()
  start() {
    this.db = new Datastore();
  }

  async connect(): void {
    return;
  }

  async disconnect(): void {
    return;
  }

  async addEvents(events: List<Event>): Promise<array<object>> {
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

  async getEventStream(ref: AggregatorRef): Promise<list<object>> {
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
