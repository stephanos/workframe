import behavior from './behavior';
import mutator from './mutator';
import Injector from './inject';
import query from './query';
import shell from './shell';


const injector = new Injector();

export default {
  behavior: behavior,
  mutator: mutator,
  inject: (reference) => {
    return (target, key) => {
      injector.run(reference, target, key);
    };
  },
  query: query,
  shell: shell,
};
