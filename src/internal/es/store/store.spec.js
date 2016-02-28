import sinon from 'sinon';
import assert from 'assert';
import { Map, List } from 'immutable';

import EventStore from './store';


describe('Event Store', () => {
  let store;
  let storage;

  before(() => {
    const clock = {
      now: sinon.stub().returns(new Date(0)),
    };
    const idGenerator = {
      next: sinon.stub().returns('42'),
    };
    storage = {
      addEvents: sinon.mock().returns(Promise.resolve()),
      getEventStream: sinon.mock().returns(Promise.resolve(List())),
    };

    store = new EventStore(storage, idGenerator, clock);
  });

  it('add events', async () => {
    const evt1 = Map();
    const evt2 = Map();
    await store.addEvents(List.of(evt1, evt2));

    assert.ok(storage.addEvents.calledOnce);
    assert.deepEqual(storage.addEvents.getCall(0).args[0].toJS(), [
      {
        id: '42-0',
        commit: {
          id: '42',
          sequence: 0,
          size: 2,
          timestamp: new Date(0),
        },
      }, {
        id: '42-1',
        commit: {
          id: '42',
          sequence: 1,
          size: 2,
          timestamp: new Date(0),
        },
      },
    ]);
  });

  // it('get empty event stream', async () => {
  //   const stream = await store.getEventStream();
  // });
  //
  // it('get non-empty event stream', async () => {
  //   storage.getEventStream.returns(Promise.resolve(List(
  //     Map({
  //
  //     }), Map({
  //
  //     }))))
  // })
});
