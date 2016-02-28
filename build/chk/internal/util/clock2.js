/* @flow */

class Clock {

  static now(): number {
    return new Date().getTime();
  }
}

export default Clock;