import { MongoClient } from 'mongodb';

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient>;
}

// This is necessary to convert the file into a module, to avoid global scope pollution
export {};
