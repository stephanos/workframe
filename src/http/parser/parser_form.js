/* flow */

import { Component } from '../../container';

import BaseBodyParser from './parser_base';


@Component()
class FormBodyParser extends BaseBodyParser {

  get supportedContentTypes(): string[] {
    return [];
  }

  async parse() {
    // TODO
  }
}


export default FormBodyParser;
