import Status from '../status';
import { transitionComponentState } from './util';


async function stopChildren(container) {
  await Promise.all(container.children.map((c) => c.stop()));
}

async function stop(container) {
  container.updateStatus(Status.STOPPING);

  await transitionComponentState(container, 'stop');
  await stopChildren(container);

  container.updateStatus(Status.STOPPED);
}


export default stop;
