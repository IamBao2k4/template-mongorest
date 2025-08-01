import { AdapterRegistry, adapterRegistry } from "../adapters/base/adapterRegister";
import { RelationshipRegistry } from "../adapters/base/relationship/RelationshipRegistry";
import { ElasticsearchAdapter } from "../adapters/elasticsearch/elasticsearchAdapter";
import { MongoDBAdapter } from "../adapters/mongodb/mongodbAdapter";
import { MySQLAdapter } from "../adapters/mysql/mysqlAdapter";
import { PostgreSQLAdapter } from "../adapters/postgresql/postgresqlAdapter";
import { ErrorCodes, wrapError } from "../errors";
import { BootstrapErrors } from "../errors/errorFactories";
import {
  BootstrapConfig,
  ConnectionTestResult,
  CustomAdapterConfig,
  SystemStatus,
} from "../types";
import { NewCore } from "./newCore";
import { CoreConfig } from "./types";

export class CoreBootstrap {
  private core?: NewCore;
  public relationshipRegistry: RelationshipRegistry;
  public adapterRegistry: AdapterRegistry

  constructor() {
    this.relationshipRegistry = new RelationshipRegistry();
    this.adapterRegistry = adapterRegistry
  }

  async initializeWithConfig(config: BootstrapConfig): Promise<NewCore> {
    if (!config) {
      throw BootstrapErrors.configRequired();
    }
    try {
      if (config.includeBuiltinAdapters !== false) {
        await this.registerBuiltinAdapters();
      }
      if (config.relationships) {
        this.relationshipRegistry.registerBulk(config.relationships);
      } else if (config.includeBuiltinAdapters !== false) {
        console.warn("No relationships defined in configuration");
      }
      this.core = new NewCore(this.relationshipRegistry, this.adapterRegistry);
      if (config.core) {
        await this.core.initialize(config.core);
      }
      return this.core;
    } catch (error) {
      throw BootstrapErrors.initConfigFailed(error);
    }
  }

  async initializeWithBuiltinAdapters(config?: CoreConfig): Promise<NewCore> {
    try {
      await this.registerBuiltinAdapters();
      this.core = new NewCore(this.relationshipRegistry, this.adapterRegistry);
      if (config) {
        await this.core.initialize(config);
      }
      return this.core;
    } catch (error) {
      throw BootstrapErrors.initBuiltinFailed(error);
    }
  }
  

  getCore(): NewCore {
    if (!this.core) {
      throw BootstrapErrors.coreNotInitialized();
    }
    return this.core;
  }

  private async registerBuiltinAdapters(): Promise<void> {
    try {
      // Register MongoDB adapter
      const mongoAdapter = new MongoDBAdapter(this.relationshipRegistry);
      this.adapterRegistry.register("mongodb",mongoAdapter);
      console.log("✅ MongoDB adapter registered");

      // Register PostgreSQL adapter
      const postgresAdapter = new PostgreSQLAdapter();
      this.adapterRegistry.register("postgresql",postgresAdapter);
      console.log("✅ PostgreSQL adapter registered");

      // Register Elasticsearch adapter
      const elasticsearchAdapter = new ElasticsearchAdapter();
      this.adapterRegistry.register("elasticsearch",elasticsearchAdapter);
      console.log("✅ Elasticsearch adapter registered");

      // Register MySQL adapter
      const mysqlAdapter = new MySQLAdapter();
      this.adapterRegistry.register("mysql",mysqlAdapter);
      console.log("✅ MySQL adapter registered");
    } catch (error) {
      console.error("❌ Failed to register built-in adapters:", error);
      throw wrapError(error, ErrorCodes.BST_INIT_BUILTIN_FAILED);
    }
  }

  getStatus(): SystemStatus {
    const adapters = this.adapterRegistry.listAdapters();
    const relationships = this.relationshipRegistry.listAllRelationships();

    return {
      initialized: !!this.core,
      adapters: adapters,
      relationships: Object.keys(relationships),
    };
  }

  async dispose(): Promise<void> {
    if (this.core) {
      await this.core.dispose();
    }
    await this.adapterRegistry.disposeAll();
  }
}
export async function createCoreSystem(
  config?: BootstrapConfig
): Promise<NewCore> {
  const bootstrap = new CoreBootstrap();
  if (config) {
    return bootstrap.initializeWithConfig(config);
  } else {
    return bootstrap.initializeWithBuiltinAdapters();
  }
}
