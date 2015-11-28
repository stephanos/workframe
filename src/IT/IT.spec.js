describe('Integration Test', () => {
  describe('with fixture "account"', () => {
    let app;
    let Accessor;
    // let Processor;

    it('should load', () => {
      const ns = require('./fixture/account');

      app = ns.default;
      Accessor = ns.AccountAccessor;
      // Processor = ns.ChangeEmailProcessor;
    });

    it('should handle query', () => {
      app.dispatch(Accessor, {
        userId: 42,
      });
    });

    // it('should handle command', () => {
    //   app.dispatch(Processor, {
    //   });
    // });
  });
});
