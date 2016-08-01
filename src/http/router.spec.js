import assert from 'assert';
import { object as mock, when } from 'testdouble';

import Router from './router';


let router;

describe('Router', () => {
  beforeEach(() => {
    router = new Router();
    router.appContext = mock('ApplicationContext');
    router.endpointFactory = mock('EndpointFactory');
    router.filterFactory = mock('FilterFactory');
    router.resourceFactory = mock('ResourceFactory');
  });

  describe('start', () => {
    it('should create route tree', async () => {
      class Controller {}
      class UrlRouter {
        get routes() {
          return {
            '/a': Controller,
          };
        }
      }

      const urlRouterComponent = { factory: UrlRouter };
      when(router.appContext.getComponentByName('UrlRouter'))
        .thenReturn(urlRouterComponent);
      when(router.appContext.createComponent(urlRouterComponent))
        .thenReturn(new UrlRouter());
      when(router.filterFactory.create([], []))
        .thenReturn([]);
      when(router.endpointFactory.create(Controller))
          .thenReturn([]);
      when(router.resourceFactory.create('/a', [], []))
        .thenReturn([]);

      await router.start();
    });

    it('should fail when no UrlRouter is found', async () => {
      try {
        await router.start();
        throw new Error('Missing expected exception');
      } catch (e) {
        assert.equal(e.message, 'unable to find "UrlRouter"');
      }
    });
  });
});
