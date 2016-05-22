import Boot from './boot';
import { Component, Inject } from './container';
import { Record } from './util';


async function boot(opts) {
  const app = new Boot(opts);
  await app.init();
  return app;
}


export {
  boot,
  Component,
  Inject,
  Record,
};
