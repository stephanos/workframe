class Filter {

  constructor(handler, params) {
    this.handler = handler;
    this.params = params;
  }

  /* eslint no-underscore-dangle:0 */
  async handle(...args) {
    return await args[0].invoke(module, this.handler, this.handler.__handle, args.slice(1));
  }
}


export default Filter;
