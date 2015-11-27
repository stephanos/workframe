/* @flow */

type Call = {
  method: string;
  arguments: Array<any>;
};


class Collector {

  _heap: Array<Call>;

  constructor() {
    this._heap = [];
  }

  add(call: Call) {
    this._heap.push(call);
  }
}


export default Collector;
