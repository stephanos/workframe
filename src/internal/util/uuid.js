import idGenerator from 'node-uuid';


export default {

  next: () => {
    return idGenerator.v1();
  },
};
