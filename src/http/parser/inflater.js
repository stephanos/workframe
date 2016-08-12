import zlib from 'zlib';

import HttpError from '../error';
import { Component } from '../../container';


@Component()
class Inflater {

  inflate(request, encoding) {
    let stream;
    switch (encoding) {
      case 'deflate':
        stream = zlib.createInflate();
        request.pipe(stream);
        break;
      case 'gzip':
        stream = zlib.createGunzip();
        request.pipe(stream);
        break;
      case 'identity':
        stream = request;
        break;
      default:
        throw new HttpError(415, `unsupported content encoding '${encoding}'`);
    }
    return stream;
  }
}


export default Inflater;
