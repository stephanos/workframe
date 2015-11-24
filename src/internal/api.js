class API {

  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  dispatch(...args) {
    return this.dispatcher.handle(...args);
  }
}


export default API;
