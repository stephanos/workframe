/* @flow */

import behavior from './decorators/behavior';
import command from './decorators/command';
import inject from './decorators/inject';
import query from './decorators/query';
import shell from './decorators/shell';

export default {
  behavior: behavior,
  command: command,
  inject: inject,
  query: query,
  shell: shell,
};
