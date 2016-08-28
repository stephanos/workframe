import sinon from 'sinon';
import assert from 'assert';
import { List } from 'immutable';

import Event from '../event';
import AggregatorRef from '../aggregatorRef';

import EventStore from './store';
import MemoryStorage from './storage/memory';


function memory() {
  const storage = new MemoryStorage();
  storage.start();
  return storage;
}

describe('Event Store IT', () => {
  let store;

  [memory].forEach((storageFactory) => {
    describe(`storage engine '${storageFactory.name}'`, () => {
      beforeEach(() => {
        store = new EventStore();
        store.idGenerator = {
          next: sinon.stub().returns('42'),
        };
        store.clock = {
          now: sinon.stub().returns(new Date(0)),
        };
        store.storage = storageFactory();
      });

      it('should add add events', async () => {
        const evt1 = new Event();
        const evt2 = new Event();
        await store.addEvents(List.of(evt1, evt2));
      });

      it('should return event stream', async () => {
        const aggr = new AggregatorRef('ctx', 'name', 'id');

        const evt1 = new Event();
        evt1.aggregate = Object.assign({}, aggr, { revision: 0 });

        const evt2 = new Event();
        evt2.aggregate = Object.assign({}, aggr, { revision: 1 });

        await store.addEvents(List.of(evt1, evt2));

        const stream = await store.getEventStream(aggr);
        assert.deepEqual(stream.toJS(), {
          aggregate: {
            context: 'ctx',
            name: 'name',
            id: 'id',
            revision: 1,
          },
          events: [
            {
              id: '42-0',
              aggregate: {
                context: 'ctx',
                name: 'name',
                id: 'id',
                revision: 0,
              },
              commit: {
                id: '42',
                sequence: 0,
                size: 2,
                timestamp: new Date(0),
              },
            }, {
              id: '42-1',
              aggregate: {
                context: 'ctx',
                name: 'name',
                id: 'id',
                revision: 1,
              },
              commit: {
                id: '42',
                sequence: 1,
                size: 2,
                timestamp: new Date(0),
              },
            },
          ],
        });
      });
    });
  });
});
