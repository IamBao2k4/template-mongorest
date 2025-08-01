import {
    ConnectOptions,
    MongoClient,
    MongoClientOptions
} from "mongodb";

import { MyCustomDb } from "./DbCustom";


export class ConnectionCustom extends MongoClient {
    private client: MongoClient;

    constructor(uri: string, options?: MongoClientOptions) {
        super(uri, options);
        this.client = this;
    }

    async connectToDb(dbName: string): Promise<MyCustomDb> {
        await this.client.connect();
        return new MyCustomDb(this.client, dbName);
    }
}
