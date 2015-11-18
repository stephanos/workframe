import LoaderDefinitionType from './loader';


describe('LoaderDefinitionType', () => {
  describe('validation', () => {
    it('should always succeed', () => {
      class Loader {
      }

      LoaderDefinitionType.verify(Loader);
    });
  });
});
