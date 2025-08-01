import { Collection, CollectionOptions, CreateCollectionOptions, Db, Document, MongoClient, WithId } from 'mongodb';
import { CustomCollection } from './CollectionCustom';

export class MyCustomDb extends Db {


  constructor(client: MongoClient, dbName: string) {
    // Khởi tạo Db gốc bằng client và tên DB
    super(client, dbName, {});

    // Có thể thêm custom logic tại đây
    console.log(`MyCustomDb connected to ${dbName}`);
  }

  override collection<TSchema extends Document = Document>(
    name: string,
    options?: CollectionOptions
  ): CustomCollection<TSchema> {
    const baseCollection = super.collection<TSchema>(name, options);
    const customCollection = Object.setPrototypeOf(
      baseCollection,
      CustomCollection.prototype
    ) as CustomCollection<TSchema>;

    return customCollection;
  }

  override async createCollection<TSchema extends Document = Document>(
    name: string,
    options?: CollectionOptions
  ): Promise<CustomCollection<TSchema>> {
    const collection = await super.createCollection<TSchema>(name, options);
    return Object.setPrototypeOf(collection, CustomCollection.prototype) as CustomCollection<TSchema>;
  }

  override async dropCollection(name: string): Promise<boolean> {
    return super.dropCollection(name);
  }

  async findOneAndLog<T extends Document = Document>(
    collectionName: string,
    filter: any
  ): Promise<WithId<T> | null> {
    const doc = await this.collection<T>(collectionName).findOne(filter);
    console.log('Found doc:', doc);
    return doc;
  }
}
