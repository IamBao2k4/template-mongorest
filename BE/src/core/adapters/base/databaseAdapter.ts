import { type } from "node:os";
import { AdapterErrors } from "../../errors/errorFactories";
import {
  IntermediateQuery,
  IntermediateQueryResult,
} from "../../types/intermediateQuery";
import { AdapterType, classToKeyMap } from "./adapterRegister";
import {
  AdapterCapabilities,
  AdapterConfig,
  DatabaseAdapter,
  DatabaseType,
  ExecutionOptions,
  ValidationError,
  ValidationResult,
  ValidationWarning,
} from "./types";
import { promises } from "node:dns";
import {
  PostgreSQLAdapter,
  PostgreSQLQuery,
} from "../postgresql/postgresqlAdapter";
import { MongoDBQuery } from "../mongodb/types";
import { MySQLQuery } from "../mysql/mysqlAdapter";
import { ElasticsearchQuery } from "../elasticsearch/elasticsearchAdapter";
/**
 * Abstract base class for database adapters
 */
export type QueryType =
  | PostgreSQLQuery
  | MongoDBQuery
  | MySQLQuery
  | ElasticsearchQuery;
export abstract class BaseDatabaseAdapter<IntanceDb = unknown>
  implements DatabaseAdapter
{
  protected config?: AdapterConfig;
  protected isInitialized = false;

  abstract convertQuery(query: IntermediateQuery): QueryType;
  abstract executeQuery<T = any>(
    collectionName: string,
    query: IntermediateQuery,
    nativeQuery: QueryType,
    options?: ExecutionOptions
  ): Promise<IntermediateQueryResult<T>>;
  abstract getCapabilities(): AdapterCapabilities;

  validateQuery(query: IntermediateQuery): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Basic validation
    if (!query.collection) {
      errors.push({
        code: "MISSING_COLLECTION",
        message: "Collection/table name is required",
        path: "collection",
      });
    }

    // Validate against capabilities
    const capabilities = this.getCapabilities();

    // Check filter operators
    if (query.filter) {
      this.validateFilterOperators(query.filter, capabilities, errors);
    }

    // Check join types
    if (query.joins) {
      query.joins.forEach((join, index) => {
        if (!capabilities.joinTypes.includes(join.type)) {
          errors.push({
            code: "UNSUPPORTED_JOIN_TYPE",
            message: `Join type '${join.type}' is not supported`,
            path: `joins[${index}].type`,
          });
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  protected validateFilterOperators(
    filter: any,
    capabilities: AdapterCapabilities,
    errors: ValidationError[]
  ): void {
    if (filter.conditions) {
      filter.conditions.forEach((condition: any, index: number) => {
        if (!capabilities.filterOperators.includes(condition.operator)) {
          errors.push({
            code: "UNSUPPORTED_OPERATOR",
            message: `Filter operator '${condition.operator}' is not supported`,
            path: `filter.conditions[${index}].operator`,
          });
        }
      });
    }

    if (filter.nested) {
      filter.nested.forEach((nested: any) => {
        this.validateFilterOperators(nested, capabilities, errors);
      });
    }
  }

  async initialize(config: AdapterConfig): Promise<void> {
    this.config = config;
    this.isInitialized = true;
  }

  async dispose(): Promise<void> {
    this.isInitialized = false;
  }

  abstract testConnection(): Promise<boolean>;

  abstract getIntanceDb(): Promise<IntanceDb>;

  protected ensureInitialized(): void {
    if (!this.isInitialized) {
      throw AdapterErrors.notInitialized("database");
    }
  }

  protected getTypeChild(adapter: DatabaseAdapter): keyof AdapterType {
    return classToKeyMap[
      adapter.constructor.name as keyof typeof classToKeyMap
    ];
  }

  protected createResult<T>(
    data: T[],
    query: IntermediateQuery,
    nativeQuery: QueryType,
    executionTime?: number,
    pagination?: {
      current_page: number;
      last_page: number;
      total: number;
      hasMore?: boolean;
    }
  ): IntermediateQueryResult<T> {
    const result: IntermediateQueryResult<T> = {
      data,
      metadata: {
        adapter: this.getTypeChild(this),
        query,
        nativeQuery,
        executionTime,
      },
    };

    // Add pagination info if applicable
    if (pagination) {
      result.pagination = pagination;
    }

    return result;
  }
}
