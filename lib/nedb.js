declare module 'nedb' {
  declare class Query {
    sort(sortyBy: Object): Query;
    exec(callback: (err: Error, found: Object[]) => void): void;
  }

  declare class Datastore {
    constructor(): void;
    find(qry: Object, callback?: (err: Error, found: Object[]) => void): Query;
    insert(docs: Object[], callback: (err: Error, newDocs: Object[]) => void): void;
  }

  declare module.exports: typeof Datastore;
}
