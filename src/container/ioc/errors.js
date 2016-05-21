export class ResolveError extends Error {

  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'ResolveError';
  }
}

export class KeyError extends Error {

  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'KeyError';
  }
}
