/* @flow */

import idGenerator from 'node-uuid';

export default {

  next: (): string => idGenerator.v1()
};