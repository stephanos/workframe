class Event {

  id;
  commandId;
  context;
  payload;

  name;
  version;

  // commit: {
  //   id,
  //   size,
  //   sequence,
  //   stamp,
  // };

  aggregateContext;
  aggregateName;
  aggregateId;
  aggregateRevision;
}

export default Event;