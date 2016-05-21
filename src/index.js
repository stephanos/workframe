import API from './boot';
import { Component, Data, Inject } from './core';


export { Component, Data, Inject };

export function boot(opts) {
  return new API(opts);
}
