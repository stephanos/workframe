import Router from './router';
import Server from './server';
import { Component, Inject } from '../container';


@Component()
class HttpModule {

  @Inject(Router)
  router;

  @Inject(Server)
  server;
}


export default HttpModule;
