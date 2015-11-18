import MutatorComponentType from './mutator';


describe('MutatorComponentType', () => {
  describe('validation', () => {
    it('should always succeed', () => {
      class Loader {
      }

      MutatorComponentType.verify(Loader);
    });
  });
});
