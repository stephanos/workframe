import fs from 'fs-extra';
import path from 'path';
import { Map, OrderedSet, fromJS } from 'immutable';

import { Component } from '../container';


const defaultProfile = 'default';
const envKeyPrefix = 'app.';


function createEnvConfig() {
  return Map(process.env)
    .filter((value, key) => key.startsWith(envKeyPrefix))
    .mapKeys((key) => key.replace(envKeyPrefix, ''));
}

function createArgsConfig() {
  return Map(); // TODO
}

function createFileConfig(container, profiles) {
  let conf = Map();

  const files = OrderedSet([defaultProfile]).merge(profiles).map((profile) => `${profile}.json`);
  files.forEach((file) => {
    const filePath = path.normalize(path.join(container.rootDir, 'config', file));
    if (fs.existsSync(filePath)) {
      conf = conf.mergeDeep(fromJS(JSON.parse(fs.readFileSync(filePath, 'utf-8'))));
    }
  });

  container.children.forEach((child) => {
    conf = conf.mergeDeep(createFileConfig(child, profiles));
  });

  return conf;
}


@Component()
class Config {

  async start() {
    const defaultConf = Map({ profiles: OrderedSet([defaultProfile]) });
    const argsConf = createArgsConfig();
    const envConf = createEnvConfig();
    const tmpConf = defaultConf.mergeDeep(argsConf).mergeDeep(envConf);
    const fileConf = createFileConfig(process.rootContainer, tmpConf.get('profiles'));
    this.conf = tmpConf.mergeDeep(fileConf);
  }

  get(key) {
    const val = this.conf.get(key);
    if (val === undefined) {
      throw new Error(`unknown config key '${key}'`);
    }
    return val;
  }

  has(key) {
    return this.conf.has(key);
  }
}


export default Config;
