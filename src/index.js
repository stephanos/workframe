import API from './boot';
import { Data } from './util';
import { Component, Inject } from './container';


export { Component, Data, Inject };

export function boot(opts) {
  return new API(opts);
}
