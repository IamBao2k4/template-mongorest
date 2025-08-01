import { OptionsInput, QueryParams } from "../types";

import {
  IntermediateQuery,
  IntermediateQueryResult,
} from "../types/intermediateQuery";

import { RbacValidator } from "../rbac/rbac-validator";
import { RelationshipRegistry } from "../adapters/base/relationship/RelationshipRegistry";
import { CoreErrors } from "../errors/errorFactories";
import { ObjectId } from "mongodb"; // Assuming MongoDB is used for ObjectId type
import {
  AdapterRegistry,
  adapterRegistry,
  AdapterType,
} from "../adapters/base/adapterRegister";
import { DatabaseAdapter, DatabaseType } from "../adapters/base/types";
import { CoreConfig } from "./types";
import {
  BaseDatabaseAdapter,
  QueryType,
} from "../adapters/base/databaseAdapter";
import { MongoDBAdapter } from "../adapters/mongodb/mongodbAdapter";
import { MySQLAdapter } from "../adapters/mysql/mysqlAdapter";
import { MyCustomDb } from "../adapters/mongodb/customs/DbCustom";
import { Client } from "@elastic/elasticsearch";
import { native, Pool as Poolpg } from "pg";
import { Pool as Poolsql } from "mysql2/promise";
import { QueryConverter } from "../adapters/converter/queryConverter";

/**
 * New core architecture with clean separation of concerns
 */

export class NewCore {
  private queryConverter: QueryConverter;
  private rbacValidator: RbacValidator;
  private adapterRegistry: AdapterRegistry;
  private relationshipRegistry: RelationshipRegistry;

  constructor(
    relationshipRegistry: RelationshipRegistry,
    customAdapterRegistry?: AdapterRegistry
  ) {
    this.rbacValidator = new RbacValidator();
    this.relationshipRegistry = relationshipRegistry;
    this.queryConverter = new QueryConverter();
    this.adapterRegistry = customAdapterRegistry || adapterRegistry;
  }

  /**
   * Main query processing method
   */
  async findAll<T = any>(
    params: QueryParams,
    collection: string,
    options: OptionsInput = {
      databaseType: "mongodb",
      roles: ["default"],
    }
  ): Promise<IntermediateQueryResult<T>> {
    const startTime = Date.now();
    if (!this.rbacValidator.hasAccess(collection, "create", options.roles)) {
      throw CoreErrors.accessDeniedCreate(collection, options.roles);
    }
    const intermediateQuery = this.queryConverter.convert(
      params,
      collection,
      options.roles
    );
    this.enhanceQueryWithRelationships(intermediateQuery);
    const adapter = this.getAdapter(options.databaseType);
    const validation = adapter.validateQuery(intermediateQuery);
    if (!validation.valid) {
      throw CoreErrors.queryValidationFailed(validation.errors);
    }

    // 7. Convert to native database query
    const nativeQuery = adapter.convertQuery(intermediateQuery);

    console.log("Executing query:", JSON.stringify(nativeQuery));

    const result = adapter.executeQuery<T>(
      collection,
      intermediateQuery,
      nativeQuery as any
    );
    return result;
  }

  /**
   * Test adapter connection
   */
  async testConnection(databaseType: keyof AdapterType): Promise<boolean> {
    const adapter = this.getAdapter(databaseType);
    return adapter.testConnection();
  }

  /**
   * Initialize core with configuration
   */
  async initialize(config: CoreConfig): Promise<void> {
    if (config.adapters) {
      await this.adapterRegistry.initializeAll(
        config.adapters,
        this.relationshipRegistry
      );
    }
  }

  /**
   * Dispose of core resources
   */
  async dispose(): Promise<void> {
    await this.adapterRegistry.disposeAll();
  }

  /**
   * Get All datpter
   */
  public getAdapterAll() {
    return this.adapterRegistry.getAdapters();
  }

  /**
   * Get database adapter
   */
  public getAdapter<K extends keyof AdapterType>(
    type: K
  ): NonNullable<AdapterType[K]> {
    const adapter = this.adapterRegistry.getAdapter(type);
    if (!adapter) {
      throw CoreErrors.adapterNotFound(type);
    }
    return adapter;
  }

  /**
   * Enhance query with relationship information
   */
  public enhanceQueryWithRelationships(query: IntermediateQuery): void {
    if (!this.relationshipRegistry || !query.joins) return;
    this.enhanceJoinsRecursively(query.joins, query.collection);
  }

  /**
   * Recursively enhance joins with relationship information
   */
  private enhanceJoinsRecursively(
    joins: any[],
    sourceCollection: string
  ): void {
    if (!this.relationshipRegistry) {
      throw CoreErrors.relationshipNotInitialized();
    }

    if (!Array.isArray(joins)) {
      throw CoreErrors.joinsInvalidType();
    }

    joins.forEach((join) => {
      if (join.relationship && !join.on.length) {
        // Populate join conditions from relationship registry
        const relationAction =
          this.relationshipRegistry!.getRelationships(sourceCollection);
        const relationAuto = this.relationshipRegistry!.getRelationships("All");
        const relationships = [...relationAction, ...relationAuto];
        if (!Array.isArray(relationships)) {
          throw CoreErrors.relationshipNotFound(sourceCollection);
        }

        const relationship = relationships.find(
          (rel) => rel.name === join.relationship!.name
        );

        if (relationship) {
          join.on = [
            {
              local: relationship.localField,
              foreign: relationship.foreignField,
              operator: "eq",
            },
          ];

          // Update target to use actual target table
          join.target = relationship.targetTable;

          // Set join type based on relationship type
          if (relationship.type === "one-to-one") {
            join.type = "one-to-one";
          } else if (relationship.type === "one-to-many") {
            join.type = "one-to-many";
          } else if (relationship.type === "many-to-one") {
            join.type = "many-to-one";
          } else if (relationship.type === "many-to-many") {
            join.type = "many-to-many";
            join.relationship!.junction = relationship.junction;
          }
        }
      }

      // Recursively enhance nested joins
      if (join.joins && join.joins.length > 0) {
        this.enhanceJoinsRecursively(join.joins, join.target);
      }
    });
  }

  /**
   * Create a new resource
   */
  async create<
    T,
    P extends T & {
      _id: string;
      created_at: Date;
      updated_at: Date;
      created_by: any;
      updated_by: any;
    }
  >(
    collection: string,
    data: T,
    options: OptionsInput = {
      databaseType: "mongodb",
      roles: ["default"],
    }
  ): Promise<IntermediateQueryResult<P>> {
    // Validate RBAC access
    if (!this.rbacValidator.hasAccess(collection, "create", options.roles)) {
      throw CoreErrors.accessDeniedCreate(collection, options.roles);
    }
    // Get appropriate database adapter
    const adapter = this.getAdapter(options.databaseType);

    // Create intermediate query for insert operation
    const intermediateQuery: IntermediateQuery = {
      type: "insert",
      collection,
      data,
      target: collection,
      filters: [],
      metadata: {
        database: options.databaseType,
        timestamp: new Date(),
        user: {
          roles: options.roles,
        },
      },
    };

    // Apply RBAC field restrictions
    this.applyRbacRestrictions(intermediateQuery, collection, options.roles);
    const nativeQuery = adapter.convertQuery(intermediateQuery) as any
    // Execute the insert
    const result = await adapter.executeQuery<P>(
      collection,
      intermediateQuery,
      nativeQuery
    );

    return result;
  }

  /**
   * Update a resource by ID
   */
  async update<T, P extends T & {
      _id: string;
      created_at: Date;
      updated_at: Date;
      created_by: any;
      updated_by: any;
    }>(
    collection: string,
    id: string,
    data: any,
    options: OptionsInput = {
      databaseType: "mongodb",
      roles: ["default"],
    }
  ): Promise<IntermediateQueryResult<P>> {
    if (data._id) {
      delete data._id;
    }
    // Get appropriate database adapter
    const adapter = this.getAdapter(options.databaseType);
    // Create intermediate query for update operation
    const intermediateQuery: IntermediateQuery = {
      type: "update",
      collection,
      data,
      target: collection,
      filters: [
        {
          field: "_id",
          operator: "eq",
          value: new ObjectId(id),
        },
      ],
      metadata: {
        database: options.databaseType,
        timestamp: new Date(),
        user: {
          roles: options.roles,
        },
      },
    };

    // Apply RBAC field restrictions
    this.applyRbacRestrictions(intermediateQuery, collection, options.roles);
    const query = adapter.convertQuery(intermediateQuery) as QueryType;
    console.log("query", query);
    // Execute the update
    const result = await adapter.executeQuery<P>(
      collection,
      intermediateQuery,
      adapter.convertQuery(intermediateQuery) as any
    );

    if (!result.data || result.data.length === 0) {
      throw CoreErrors.resourceNotFound(collection, id);
    }

    return result;
  }

  /**
   * Partial update a resource by ID
   */
  async partialUpdate<T = any>(
    collection: string,
    id: string,
    data: any,
    options: OptionsInput = {
      databaseType: "mongodb",
      roles: ["default"],
    }
  ): Promise<IntermediateQueryResult<T>> {
    // Validate RBAC access
    if (!this.rbacValidator.hasAccess(collection, "update", options.roles)) {
      throw CoreErrors.accessDeniedUpdate(collection, options.roles);
    }

    // Get appropriate database adapter
    const adapter = this.getAdapter(options.databaseType);

    // Create intermediate query for partial update operation
    const intermediateQuery: IntermediateQuery = {
      type: "update",
      collection,
      data,
      target: collection,
      filters: [
        {
          field: "_id",
          operator: "eq",
          value: new ObjectId(id),
        },
      ],
      options: {
        partial: true,
      },
      metadata: {
        database: options.databaseType,
        timestamp: new Date(),
        user: {
          roles: options.roles,
        },
      },
    };

    // Apply RBAC field restrictions
    this.applyRbacRestrictions(intermediateQuery, collection, options.roles);

    // Execute the partial update
    const result = await adapter.executeQuery<T>(
      collection,
      intermediateQuery,
      adapter.convertQuery(intermediateQuery) as any
    );

    if (!result.data || result.data.length === 0) {
      throw CoreErrors.resourceNotFound(collection, id);
    }

    return result;
  }

  /**
   * Delete a resource by ID
   */
  async delete(
    collection: string,
    id: string,
    options: OptionsInput = {
      databaseType: "mongodb",
      roles: ["default"],
    }
  ): Promise<IntermediateQueryResult<any>> {
    // Validate RBAC access
    if (!this.rbacValidator.hasAccess(collection, "delete", options.roles)) {
      throw CoreErrors.accessDeniedDelete(collection, options.roles);
    }

    // Get appropriate database adapter
    const adapter = this.getAdapter(options.databaseType);

    // Create intermediate query for delete operation
    const intermediateQuery: IntermediateQuery = {
      type: "delete",
      collection,
      target: collection,
      filters: [
        {
          field: "_id",
          operator: "eq",
          value: new ObjectId(id),
        },
      ],
      metadata: {
        database: options.databaseType,
        timestamp: new Date(),
        user: {
          roles: options.roles,
        },
      },
    };
    // Execute the delete
    const result = await adapter.executeQuery(
      collection,
      intermediateQuery,
      adapter.convertQuery(intermediateQuery) as any
    );

    return result;
  }

  /**
   * Find a resource by ID
   */
  async findById<T = any>(
    collection: string,
    params: QueryParams,
    id: string,
    options: OptionsInput = {
      databaseType: "mongodb",
      roles: ["default"],
    }
  ): Promise<IntermediateQueryResult<T>> {
    // Validate RBAC access
    if (!this.rbacValidator.hasAccess(collection, "read", options.roles)) {
      throw CoreErrors.accessDeniedRead(collection, options.roles);
    }
    const intermediateQuery = this.queryConverter.convert(
      params,
      collection,
      options.roles
    );
    intermediateQuery.type = "read";
    if (!intermediateQuery.filters) {
      intermediateQuery.filters = [];
    }
    intermediateQuery.filters?.push({
      field: "_id",
      operator: "eq",
      value: new ObjectId(id),
    });
    intermediateQuery.limit = 1;
    this.enhanceQueryWithRelationships(intermediateQuery);

    // Get appropriate database adapter
    const adapter = this.getAdapter(options.databaseType);
    // Create intermediate query for finding by ID
    // const intermediateQuery: IntermediateQuery = {
    //   type: "read",
    //   collection,
    //   target: collection,
    //   filters: [
    //     {
    //       field: "_id",
    //       operator: "eq",
    //       value: new ObjectId(id),
    //     },
    //   ],
    //   limit: 1,
    //   metadata: {
    //     database: databaseType,
    //     timestamp: new Date(),
    //     user: {
    //       roles,
    //     },
    //   },
    // };
    const query = adapter.convertQuery(intermediateQuery);
    console.log(query);
    // Execute the query
    const result = await adapter.executeQuery<T>(
      collection,
      intermediateQuery,
      query as any
    );

    return result;
  }

  async findOne<T = any>(
    collection: string,
    params: QueryParams,
    filters: {
      field: string;
      operator: string;
      value: any;
    }[],
    options: OptionsInput = {
      databaseType: "mongodb",
      roles: ["default"],
    }
  ): Promise<IntermediateQueryResult<T>> {
    // Validate RBAC access
    if (!this.rbacValidator.hasAccess(collection, "read", options.roles)) {
      throw CoreErrors.accessDeniedRead(collection, options.roles);
    }
    const intermediateQuery = this.queryConverter.convert(
      params,
      collection,
      options.roles
    );
    intermediateQuery.type = "read";
    if (!intermediateQuery.filters) {
      intermediateQuery.filters = [];
    }
    intermediateQuery.filters = filters;
    intermediateQuery.limit = 1;
    this.enhanceQueryWithRelationships(intermediateQuery);
    const adapter = this.getAdapter(options.databaseType);
    const query = adapter.convertQuery(intermediateQuery);
    console.log(query);
    // Execute the query
    const result = await adapter.executeQuery<T>(
      collection,
      intermediateQuery,
      query as any
    );

    return result;
  }

  private applyRbacRestrictions(
    query: IntermediateQuery,
    collection: string,
    roles: string[]
  ): void {
    if (!query) {
      throw CoreErrors.queryObjectRequired();
    }

    if (!collection || typeof collection !== "string") {
      throw CoreErrors.collectionNameInvalid();
    }

    if (!Array.isArray(roles)) {
      throw CoreErrors.rolesInvalidType();
    }
    if (!query.select) {
      query.select = { fields: [] };
    }
    // const rbacValidator = new RbacValidator();
    // query.select.fields = rbacValidator.filterRbacFeatures(
    //   collection,
    //   action,
    //   roles,
    //   query.select.fields
    // );
  }
}
