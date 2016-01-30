import idGenerator from 'node-uuid';


export default {

  next: () => idGenerator.v1(),
};
