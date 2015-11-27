/* @flow */

import idGenerator from 'node-uuid';


export default function uuid(): string {
  return idGenerator.v1();
}
