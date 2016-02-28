export class CreateComponentError extends Error {

  constructor(details) {
    const message = `invalid component: ${ details }`;
    super(message);
    this.message = message;
    this.name = 'ComponentError';
  }
}