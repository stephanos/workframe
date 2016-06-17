import { Application } from './app';
import { Component, Inject, OnStart, OnStop } from './container';
import { Record } from './util';


async function boot(module, opts) {
  const app = new Application(module, opts);
  await app.start();
  return app;
}


export {
  boot,
  Component,
  Inject,
  OnStart,
  OnStop,
  Record,
};
