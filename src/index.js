import API from './boot';
import { Component, Data, Inject } from './container';


export { Component, Data, Inject };

export function boot(opts) {
  return new API(opts);
}
