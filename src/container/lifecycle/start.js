import Status from '../status';
import { transitionComponentState } from './util';


async function startChildren(container) {
  await Promise.all(container.children.map((c) => c.start()));
}

async function start(container) {
  container.updateStatus(Status.STARTING);

  await transitionComponentState(container, 'start');
  await startChildren(container);

  container.updateStatus(Status.STARTED);
}


export default start;
