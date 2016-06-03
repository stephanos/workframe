import { Component } from '../container';


@Component()
class Config {

  async start() {
    /* eslint global-require: 0 */
    process.env.SUPPRESS_NO_CONFIG_WARNING = true;
    this.config = require('config');
  }

  get(key) {
    return this.config.get(key);
  }

  has(key) {
    return this.config.has(key);
  }
}


export default Config;
