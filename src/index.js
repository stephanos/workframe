import API from './boot';
import { Component, Inject } from './container';
import { Record } from './util';


function boot(opts) {
  return new API(opts);
}


export {
  boot,
  Component,
  Inject,
  Record,
};
