/* flow */

import { Component } from '../../container';

import BaseBodyParser from './parser_base';


@Component()
class JsonBodyParser extends BaseBodyParser {

  get supportedContentTypes(): string[] {
    return [
      'application/json',
    ];
  }

  async parse(buffer) {
    return JSON.parse(buffer);
  }
}


export default JsonBodyParser;
