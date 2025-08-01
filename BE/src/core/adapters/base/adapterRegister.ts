
import { AdapterInfo, DatabaseAdapter, DatabaseType } from './types';
import { AdapterErrors } from '../../errors/errorFactories';
import { MongoDBAdapter } from '../mongodb/mongodbAdapter';
import { MySQLAdapter } from '../mysql/mysqlAdapter';
import { PostgreSQLAdapter } from '../postgresql/postgresqlAdapter';
import { ElasticsearchAdapter } from '../elasticsearch/elasticsearchAdapter';
import { Relationship } from './relationship/mainRelationship';
import { RelationshipRegistry } from './relationship/RelationshipRegistry';
import { BaseDatabaseAdapter } from './databaseAdapter';

/**
 * Registry for managing database adapters
 */
export interface AdapterType {
  mongodb?: MongoDBAdapter,
  mysql?: MySQLAdapter,
  elasticsearch?: ElasticsearchAdapter
  postgresql?: PostgreSQLAdapter
}

export const classToKeyMap = {
  MongoDBAdapter: 'mongodb',
  MySQLAdapter: 'mysql',
  ElasticsearchAdapter: 'elasticsearch',
  PostgreSQLAdapter: 'postgresql'
} as const;


export class AdapterRegistry {
  private static instance: AdapterRegistry;
  private adapters: AdapterType = {};

  private constructor() {

  }

  public getAdapters() {
    return this.adapters
  }

  /**
   * Get singleton instance
   */
  static getInstance(): AdapterRegistry {
    if (!AdapterRegistry.instance) {
      AdapterRegistry.instance = new AdapterRegistry();
    }
    return AdapterRegistry.instance;
  }

  /**
   * Register a database adapter
   */
  register<K extends keyof AdapterType>(type: K, adapter: AdapterType[K]): void {
    this.adapters[type] = adapter
  }

  /**
   * Unregister an adapter
   */
  unregister<K extends keyof AdapterType>(type: K): boolean {
    const result: boolean = this.adapters[type] ? true : false
    if (result) {
      this.adapters[type] = undefined
    }
    return result
  }

  /**
   * Get adapter by name and version
   */
  getAdapter<K extends keyof AdapterType>(type: K): AdapterType[K] {
    return this.adapters[type]
  }

  /**
   * List all registered adapters
   */
  listAdapters(): AdapterType {
    return this.adapters
  }

  /**
   * List adapters by type
   */
  listAdaptersByType<K extends keyof AdapterType>(types: K[]): AdapterType[K][] {
    return types.map((type) => this.adapters[type])
  }

  /**
   * Clear all adapters
   */
  clear(): void {
    this.adapters = {};
  }

  /**
   * Initialize all registered adapters
   */
  async initializeAll(configs: Record<string, any>, relationshipRegistry: RelationshipRegistry): Promise<void> {
    for (const [key, value] of Object.entries(configs)) {
      switch (key) { // Sử dụng key thay vì value[0]
        case "mongodb":
          const mongoAdapter = new MongoDBAdapter(relationshipRegistry);
          await mongoAdapter.initialize(value);
          this.register("mongodb", mongoAdapter);
          console.log("AdapterRegistry Initial Mongodb");
          break;

        case "mysql":
          const mysqlAdapter = new MySQLAdapter();
          await mysqlAdapter.initialize(value); // Thêm await
          this.register("mysql", mysqlAdapter);
          console.log("AdapterRegistry Initial Mysql");
          break;

        case "postgresql":
          const postgresAdapter = new PostgreSQLAdapter();
          await postgresAdapter.initialize(value); // Thêm await
          this.register("postgresql", postgresAdapter);
          console.log("AdapterRegistry Initial Postgresql");
          break;

        case "elasticsearch":
          const elasticsearchAdapter = new ElasticsearchAdapter();
          await elasticsearchAdapter.initialize(value); // Thêm await
          this.register("elasticsearch", elasticsearchAdapter);
          console.log("AdapterRegistry Initial Elasticsearch");
          break;
      }
    }
  }

  async disposeAll(): Promise<void> {
    const promises = Object.values(this.adapters)
      .filter((a): a is DatabaseAdapter => !!a) // loại bỏ undefined và ép kiểu
      .map(adapter => adapter.dispose());

    await Promise.all(promises);
  }

}

// Export singleton instance
export const adapterRegistry = AdapterRegistry.getInstance();