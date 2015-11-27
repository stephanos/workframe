/* @flow */

type Actio = {
  method: string;
  arguments: Array<any>;
};

type Reactio = {
};


class Collector {

  _heap: Array<Actio | Reactio>;

  constructor() {
    this._heap = [];
  }

  add(call: Actio | Reactio) {
    this._heap.push(call);
  }
}


export default Collector;
