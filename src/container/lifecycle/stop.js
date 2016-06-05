import Status from '../status';


async function stopChildren(container) {
  await Promise.all(container.children.map((c) => c.stop()));
}

async function stop(container) {
  container.updateStatus(Status.STOPPING);

  await container.registry.stop(container.dispatcher);
  await stopChildren(container);

  container.updateStatus(Status.STOPPED);
}


export default stop;
