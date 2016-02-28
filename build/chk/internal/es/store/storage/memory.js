import Datastore from 'nedb';
import { fromJS } from 'immutable';

class MemoryStorage {

  constructor(idGenerator, clock) {
    this.clock = clock;
    this.idGenerator = idGenerator;

    this.clear();
  }

  async connect() {
    return;
  }

  async disconnect() {
    return;
  }

  async addEvents(events) {
    return new Promise((resolve, reject) => {
      const eventsWithId = events.map(evt => evt.merge({ _id: evt.get('id') }));
      this.db.insert(eventsWithId.toJS(), (err, newDocs) => {
        if (err) reject(err);else resolve(newDocs);
      });
    });
  }

  async getEventStream(ref) {
    return new Promise((resolve, reject) => {
      const query = {
        'aggregate.context': ref.context,
        'aggregate.name': ref.name,
        'aggregate.id': ref.id
      };
      this.db.find(query).sort({ aggregate: { revision: 1 } }).exec((err, found) => {
        if (err) reject(err);else {
          const foundWithoutId = fromJS(found).map(evt => evt.delete('_id'));
          resolve(foundWithoutId);
        }
      });
    });
  }

  async clear() {
    this.db = new Datastore();
  }
}

export default MemoryStorage;