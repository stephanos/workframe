import assert from 'assert';


describe('Integration Test', () => {
  describe('with fixture "account"', () => {
    let app;
    let Accessor;
    // let Processor;

    it('should load', () => {
      const ns = require('./main.js');

      app = ns.default;
      Accessor = ns.AccountAccessor;
      // Processor = ns.ChangeEmailProcessor;
    });

    it('should handle query', () => {
      const result = app.dispatch(Accessor, { userId: '42' });
      assert.deepEqual(result, {
        name: 'Arthur Dent',
        email: 'arthur@earth.com',
      });
    });

    // it('should handle command', () => {
    //   app.dispatch(Processor, {
    //   });
    // });
  });
});
