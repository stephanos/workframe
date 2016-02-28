import sinon from 'sinon';
import assert from 'assert';
import { Map, List, fromJS } from 'immutable';

import EventStore from './store';
import MemoryStorage from './storage/memory';


function memory() {
  return new MemoryStorage();
}

describe('Event Store IT', () => {
  let store;

  [memory].forEach((storageFactory) => {
    describe(`storage engine '${storageFactory.name}'`, () => {
      beforeEach(() => {
        const idGenerator = {
          next: sinon.stub().returns('42'),
        };
        const clock = {
          now: sinon.stub().returns(new Date(0)),
        };
        store = new EventStore(storageFactory(), idGenerator, clock);
      });

      it('should add add events', async () => {
        const evt1 = Map();
        const evt2 = Map();
        await store.addEvents(List.of(evt1, evt2));
      });

      it('should return event stream', async () => {
        const aggrRef = { context: 'ctx', name: 'name', id: 'id' };
        const data = fromJS({ aggregate: aggrRef });
        const evt1 = data.mergeDeep({ aggregate: { revision: 0 } });
        const evt2 = data.mergeDeep({ aggregate: { revision: 1 } });
        await store.addEvents(List.of(evt1, evt2));

        const stream = await store.getEventStream(aggrRef, {});
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
