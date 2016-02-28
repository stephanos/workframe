/* @flow */

import UUID from 'node-uuid';

class IdGenerator {

  static next(): string {
    return UUID.v1();
  }
}

export default IdGenerator;