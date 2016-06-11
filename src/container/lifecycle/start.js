import Status from '../status';


async function startChildren(container) {
  await Promise.all(container.children.map((c) => c.start()));
}

async function start(container) {
  container.updateStatus(Status.STARTING);

  // children must be started AFTER parent
  await container.registry.start(container.dispatcher);
  await startChildren(container);

  container.updateStatus(Status.STARTED);
}


export default start;
