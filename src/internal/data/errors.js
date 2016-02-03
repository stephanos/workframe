export class CreateDataError extends Error {

  constructor(details) {
    const message = `invalid data: ${details}`;
    super(message);
    this.message = message;
    this.name = 'ComponentError';
  }
}
