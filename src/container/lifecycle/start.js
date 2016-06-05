import Status from '../status';


async function startChildren(container) {
  await Promise.all(container.children.map((c) => c.start()));
}

async function start(container) {
  container.updateStatus(Status.STARTING);

  await container.registry.start(container.dispatcher);
  await startChildren(container);

  container.updateStatus(Status.STARTED);
}


export default start;
