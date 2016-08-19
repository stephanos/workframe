/* @flow */


class AggregatorRef {

  context: string;
  name: string;
  id: string;
  revision: ?string;

  constructor(context: string, name: string, id: string, revision: ?string) {
    this.context = context;
    this.name = name;
    this.id = id;
    this.revision = revision;
  }
}


export default AggregatorRef;
