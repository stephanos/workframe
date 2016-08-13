/* @flow */

import zlib from 'zlib';
import stream from 'stream';

import HttpError from '../error';
import { Component } from '../../container';


@Component()
class Inflater {

  inflate(incomingStream: stream.Readable, encoding: string): stream.Readable {
    let inflatedStream;
    switch (encoding) {
      case 'deflate':
        inflatedStream = zlib.createInflate();
        incomingStream.pipe(inflatedStream);
        break;
      case 'gzip':
        inflatedStream = zlib.createGunzip();
        incomingStream.pipe(inflatedStream);
        break;
      case 'identity':
        inflatedStream = incomingStream;
        break;
      default:
        throw new HttpError(415, `unsupported content encoding '${encoding}'`);
    }
    return inflatedStream;
  }
}


export default Inflater;
