import getRawBody from 'raw-body';

import { Component } from '../../container';


@Component()
class BodyReader {

  async read(stream, opts) {
    const body = await getRawBody(stream, opts);
    return body;
  }
}


export default BodyReader;
