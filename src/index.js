import { Application } from './app';
import { Component, Inject, OnStart, OnStop } from './container';
import { Record } from './util';


async function boot(opts) {
  const app = new Application(opts);
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
