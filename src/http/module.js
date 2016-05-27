import Router from './router';
import Server from './server';
import { Component, Inject } from '../container';


@Component()
class Module {

  @Inject()
  router: Router;

  @Inject()
  server: Server;
}


export default Module;
