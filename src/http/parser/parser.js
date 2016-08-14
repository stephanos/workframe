/* flow */

import { Component, Inject, OnInit } from '../../container';
import HttpError from '../error';

import Inflater from './inflater';
import BodyReader from './reader';

import FormBodyParser from './parser_form';
import JsonBodyParser from './parser_json';


@Component()
class BodyParser {

  @Inject() formBodyParser: FormBodyParser;
  @Inject() jsonBodyParser: JsonBodyParser;
  @Inject() reader: BodyReader;
  @Inject() inflater: Inflater;


  @OnInit()
  init() {
    this.parsers = [
      this.formBodyParser,
      this.jsonBodyParser,
    ];
  }

  /* eslint no-param-reassign:0 */
  async parse(request, customParser) {
    const bodyStream = await this.getBodyStream(request);
    const parser = customParser || this.getParser(request.type);
    const body = await parser.parse(bodyStream);
    request.raw.body = body;
    return body;
  }


  getParser(contentType) {
    const parser = this.parsers.find((p) => p.supportedContentTypes.includes(contentType));
    if (!parser) {
      throw new HttpError(415, `unsupported content type '${contentType}'`, { contentType });
    }
    return parser;
  }

  async getBodyStream(request) {
    const encoding = (request.encoding || 'identity').toLowerCase();
    const inflatedStream = this.inflater.inflate(request.raw, encoding);
    const stream = await this.reader.read(inflatedStream);
    return stream;
  }
}


export default BodyParser;
