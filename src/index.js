import behavior from './behavior';
import command from './command';
import Injector from './inject';
import query from './query';
import shell from './shell';


const injector = new Injector();

export default {
  behavior: behavior,
  command: command,
  inject: (reference) => {
    return (target, key) => {
      injector.run(reference, target, key);
    };
  },
  query: query,
  shell: shell,
};
