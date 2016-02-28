import assert from 'assert';

import Signal from './signal';

describe('Signal', () => {
  it('should be created', () => {
    const actor = {};
    const context = {};
    const model = {};

    const signal = new Signal(actor, context, model);

    assert.deepEqual(signal.actor, actor);
    assert.deepEqual(signal.context, context);
    assert.deepEqual(signal.model, model);
  });
});