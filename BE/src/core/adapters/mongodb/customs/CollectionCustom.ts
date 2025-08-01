import {
  Collection,
  Filter,
  Document,
  WithId,
  WithoutId,
  FindOptions,
  AggregateOptions,
  Abortable,
  AggregationCursor,
  InsertOneOptions,
  UpdateOptions,
  ReplaceOptions,
  DeleteOptions,
  CountDocumentsOptions,
  EstimatedDocumentCountOptions,
  FindCursor,
  InsertOneResult,
  UpdateResult,
  DeleteResult,
  BulkWriteOptions,
  BulkWriteResult,
  AnyBulkWriteOperation,
  CreateIndexesOptions,
  IndexSpecification,
  DropIndexesOptions,
  ListIndexesOptions,
  DistinctOptions,
  ChangeStreamOptions,
  ChangeStream,
  ModifyResult,
  FindOneAndDeleteOptions,
  FindOneAndReplaceOptions,
  FindOneAndUpdateOptions,
  OptionalUnlessRequiredId,
  Sort,
  UpdateFilter,
  MongoServerError,
  IndexDescription,
  ListIndexesCursor as MongoListIndexesCursor,
  CommandOperationOptions
} from "mongodb";

export class CustomCollection<TSchema extends Document = Document> extends Collection<TSchema> {

  // ==================== FIND OPERATIONS ====================

  override findOne(): Promise<WithId<TSchema> | null>;
  override findOne(filter: Filter<TSchema>): Promise<WithId<TSchema> | null>;
  override findOne(
    filter: Filter<TSchema>,
    options: Omit<FindOptions, "timeoutMode">
  ): Promise<WithId<TSchema> | null>;
  override findOne<T = TSchema>(): Promise<T | null>;
  override findOne<T = TSchema>(filter: Filter<TSchema>): Promise<T | null>;
  override findOne<T = TSchema>(
    filter: Filter<TSchema>,
    options?: Omit<FindOptions, "timeoutMode">
  ): Promise<T | null>;
  override findOne(
    filter?: any,
    options?: any
  ): Promise<WithId<TSchema> | null> {
    console.log("[CustomCollection] findOne called:", { filter, options });
    console.log(this.collectionName)
    return super.findOne(filter, options);
  }

  override find(): FindCursor<WithId<TSchema>>;
  override find(filter: Filter<TSchema>): FindCursor<WithId<TSchema>>;
  override find(
    filter: Filter<TSchema>,
    options: FindOptions
  ): FindCursor<WithId<TSchema>>;
  override find<T extends Document>(
    filter?: Filter<TSchema>,
    options?: FindOptions
  ): FindCursor<T>;
  override find(filter?: any, options?: any): FindCursor<WithId<TSchema>> {
    console.log("[CustomCollection] find called:", { filter, options });
    return super.find(filter, options);
  }

  // ==================== INSERT OPERATIONS ====================

  override async insertOne(
    doc: OptionalUnlessRequiredId<TSchema>,
    options?: InsertOneOptions
  ): Promise<InsertOneResult<TSchema>> {
    console.log("[CustomCollection] insertOne called:", { doc, options });

    // Add custom validation or preprocessing here
    const docWithTimestamp = {
      ...doc,
      createdAt: new Date(),
      updatedAt: new Date()
    } as OptionalUnlessRequiredId<TSchema>;

    try {
      const result = await super.insertOne(docWithTimestamp, options);
      console.log("[CustomCollection] insertOne successful:", result.insertedId);
      return result;
    } catch (error) {
      console.error("[CustomCollection] insertOne failed:", error);
      throw error;
    }
  }

  override async insertMany(
    docs: OptionalUnlessRequiredId<TSchema>[],
    options?: BulkWriteOptions
  ): Promise<InsertManyResult<TSchema>> {
    console.log("[CustomCollection] insertMany called:", { count: docs.length, options });

    // Add timestamps to all documents
    const docsWithTimestamps = docs.map(doc => ({
      ...doc,
      createdAt: new Date(),
      updatedAt: new Date()
    })) as OptionalUnlessRequiredId<TSchema>[];

    try {
      const result = await super.insertMany(docsWithTimestamps, options);
      console.log("[CustomCollection] insertMany successful:", {
        insertedCount: result.insertedCount,
        insertedIds: Object.keys(result.insertedIds).length
      });
      return result;
    } catch (error) {
      console.error("[CustomCollection] insertMany failed:", error);
      throw error;
    }
  }

  // ==================== UPDATE OPERATIONS ====================

  override async updateOne(
    filter: Filter<TSchema>,
    update: UpdateFilter<TSchema>,
    options?: UpdateOptions
  ): Promise<UpdateResult<TSchema>> {
    console.log("[CustomCollection] updateOne called:", { filter, update, options });

    // Add updatedAt timestamp
    const updateWithTimestamp = {
      ...update,
      $set: {
        ...((update as any)?.$set || {}),
        updatedAt: new Date()
      }
    } as UpdateFilter<TSchema>;

    try {
      const result = await super.updateOne(filter, updateWithTimestamp, options);
      console.log("[CustomCollection] updateOne result:", {
        matched: result.matchedCount,
        modified: result.modifiedCount
      });
      return result;
    } catch (error) {
      console.error("[CustomCollection] updateOne failed:", error);
      throw error;
    }
  }

  override async updateMany(
    filter: Filter<TSchema>,
    update: UpdateFilter<TSchema>,
    options?: UpdateOptions
  ): Promise<UpdateResult<TSchema>> {
    console.log("[CustomCollection] updateMany called:", { filter, update, options });

    const updateWithTimestamp = {
      ...update,
      $set: {
        ...((update as any)?.$set || {}),
        updatedAt: new Date()
      }
    } as UpdateFilter<TSchema>;

    try {
      const result = await super.updateMany(filter, updateWithTimestamp, options);
      console.log("[CustomCollection] updateMany result:", {
        matched: result.matchedCount,
        modified: result.modifiedCount
      });
      return result;
    } catch (error) {
      console.error("[CustomCollection] updateMany failed:", error);
      throw error;
    }
  }

  override async replaceOne(
    filter: Filter<TSchema>,
    replacement: WithoutId<TSchema>,
    options?: ReplaceOptions
  ): Promise<UpdateResult<TSchema>> {
    console.log("[CustomCollection] replaceOne called:", { filter, replacement, options });

    const replacementWithTimestamp = {
      ...replacement,
      updatedAt: new Date(),
      createdAt: (replacement as any).createdAt || new Date()
    } as WithoutId<TSchema>;

    try {
      const result = await super.replaceOne(filter, replacementWithTimestamp, options);
      console.log("[CustomCollection] replaceOne result:", {
        matched: result.matchedCount,
        modified: result.modifiedCount
      });
      return result;
    } catch (error) {
      console.error("[CustomCollection] replaceOne failed:", error);
      throw error;
    }
  }

  // ==================== DELETE OPERATIONS ====================

  override async deleteOne(
    filter: Filter<TSchema>,
    options?: DeleteOptions
  ): Promise<DeleteResult> {
    console.log("[CustomCollection] deleteOne called:", { filter, options });

    try {
      const result = await super.deleteOne(filter, options);
      console.log("[CustomCollection] deleteOne result:", {
        deletedCount: result.deletedCount
      });
      return result;
    } catch (error) {
      console.error("[CustomCollection] deleteOne failed:", error);
      throw error;
    }
  }

  override async deleteMany(
    filter: Filter<TSchema>,
    options?: DeleteOptions
  ): Promise<DeleteResult> {
    console.log("[CustomCollection] deleteMany called:", { filter, options });

    try {
      const result = await super.deleteMany(filter, options);
      console.log("[CustomCollection] deleteMany result:", {
        deletedCount: result.deletedCount
      });
      return result;
    } catch (error) {
      console.error("[CustomCollection] deleteMany failed:", error);
      throw error;
    }
  }

  // ==================== FIND AND MODIFY OPERATIONS ====================

  // Overload definitions matching MongoDB driver signatures
  override findOneAndUpdate(
    filter: Filter<TSchema>,
    update: UpdateFilter<TSchema> | Document[],
    options: FindOneAndUpdateOptions & { includeResultMetadata: true }
  ): Promise<ModifyResult<TSchema>>;

  override findOneAndUpdate(
    filter: Filter<TSchema>,
    update: UpdateFilter<TSchema> | Document[],
    options: FindOneAndUpdateOptions & { includeResultMetadata: false }
  ): Promise<WithId<TSchema> | null>;

  override findOneAndUpdate(
    filter: Filter<TSchema>,
    update: UpdateFilter<TSchema> | Document[],
    options?: FindOneAndUpdateOptions
  ): Promise<WithId<TSchema> | null>;

  override async findOneAndUpdate(
    filter: Filter<TSchema>,
    update: UpdateFilter<TSchema> | Document[],
    options?: FindOneAndUpdateOptions & {
      includeResultMetadata?: boolean;
    }
  ): Promise<ModifyResult<TSchema> | WithId<TSchema> | null> {
    console.log("[CustomCollection] findOneAndUpdate called:", {
      filter,
      update: Array.isArray(update) ? `[${update.length} stages]` : update,
      options
    });

    let processedUpdate: UpdateFilter<TSchema> | Document[];

    // Xử lý update khác nhau cho aggregation pipeline vs update document
    if (Array.isArray(update)) {
      // Nếu là aggregation pipeline, thêm stage để set updatedAt
      processedUpdate = [
        ...update,
        {
          $set: {
            updatedAt: new Date()
          }
        }
      ];
    } else {
      // Nếu là update document thông thường
      processedUpdate = {
        ...update,
        $set: {
          ...((update as any)?.$set || {}),
          updatedAt: new Date()
        }
      } as UpdateFilter<TSchema>;
    }

    try {
      // Type-safe call to parent method
      if (options?.includeResultMetadata === true) {
        const result = await super.findOneAndUpdate(filter, processedUpdate, options as FindOneAndUpdateOptions & { includeResultMetadata: true });
        console.log("[CustomCollection] findOneAndUpdate completed", {
          includeResultMetadata: true,
          hasResult: result.value !== null
        });
        return result;
      } else if (options?.includeResultMetadata === false) {
        const result = await super.findOneAndUpdate(filter, processedUpdate, options as FindOneAndUpdateOptions & { includeResultMetadata: false });
        console.log("[CustomCollection] findOneAndUpdate completed", {
          includeResultMetadata: false,
          hasResult: result !== null
        });
        return result;
      } else {
        const result = await super.findOneAndUpdate(filter, processedUpdate, options || {});
        console.log("[CustomCollection] findOneAndUpdate completed", {
          includeResultMetadata: false,
          hasResult: result !== null
        });
        return result;
      }
    } catch (error) {
      console.error("[CustomCollection] findOneAndUpdate failed:", error);
      throw error;
    }
  }

  // findOneAndReplace overloads
  override findOneAndReplace(
    filter: Filter<TSchema>,
    replacement: WithoutId<TSchema>,
    options: FindOneAndReplaceOptions & { includeResultMetadata: true }
  ): Promise<ModifyResult<TSchema>>;

  override findOneAndReplace(
    filter: Filter<TSchema>,
    replacement: WithoutId<TSchema>,
    options: FindOneAndReplaceOptions & { includeResultMetadata: false }
  ): Promise<WithId<TSchema> | null>;

  override findOneAndReplace(
    filter: Filter<TSchema>,
    replacement: WithoutId<TSchema>,
    options?: FindOneAndReplaceOptions
  ): Promise<WithId<TSchema> | null>;

  override async findOneAndReplace(
    filter: Filter<TSchema>,
    replacement: WithoutId<TSchema>,
    options?: FindOneAndReplaceOptions & { includeResultMetadata?: boolean }
  ): Promise<ModifyResult<TSchema> | WithId<TSchema> | null> {
    console.log("[CustomCollection] findOneAndReplace called:", { filter, replacement, options });

    const replacementWithTimestamp = {
      ...replacement,
      updatedAt: new Date(),
      createdAt: (replacement as any).createdAt || new Date()
    } as WithoutId<TSchema>;

    try {
      if (options?.includeResultMetadata === true) {
        const result = await super.findOneAndReplace(filter, replacementWithTimestamp, options as FindOneAndReplaceOptions & { includeResultMetadata: true });
        console.log("[CustomCollection] findOneAndReplace completed");
        return result;
      } else if (options?.includeResultMetadata === false) {
        const result = await super.findOneAndReplace(filter, replacementWithTimestamp, options as FindOneAndReplaceOptions & { includeResultMetadata: false });
        console.log("[CustomCollection] findOneAndReplace completed");
        return result;
      } else {
        const result = await super.findOneAndReplace(filter, replacementWithTimestamp, options || {});
        console.log("[CustomCollection] findOneAndReplace completed");
        return result;
      }
    } catch (error) {
      console.error("[CustomCollection] findOneAndReplace failed:", error);
      throw error;
    }
  }

  // findOneAndDelete overloads
  override findOneAndDelete(
    filter: Filter<TSchema>,
    options: FindOneAndDeleteOptions & { includeResultMetadata: true }
  ): Promise<ModifyResult<TSchema>>;

  override findOneAndDelete(
    filter: Filter<TSchema>,
    options: FindOneAndDeleteOptions & { includeResultMetadata: false }
  ): Promise<WithId<TSchema> | null>;

  override findOneAndDelete(
    filter: Filter<TSchema>,
    options?: FindOneAndDeleteOptions
  ): Promise<WithId<TSchema> | null>;

  override findOneAndDelete(
    filter: Filter<TSchema>
  ): Promise<WithId<TSchema> | null>;

  override async findOneAndDelete(
    filter: Filter<TSchema>,
    options?: FindOneAndDeleteOptions & { includeResultMetadata?: boolean }
  ): Promise<ModifyResult<TSchema> | WithId<TSchema> | null> {
    console.log("[CustomCollection] findOneAndDelete called:", { filter, options });

    try {
      if (options?.includeResultMetadata === true) {
        const result = await super.findOneAndDelete(filter, options as FindOneAndDeleteOptions & { includeResultMetadata: true });
        console.log("[CustomCollection] findOneAndDelete completed");
        return result;
      } else if (options?.includeResultMetadata === false) {
        const result = await super.findOneAndDelete(filter, options as FindOneAndDeleteOptions & { includeResultMetadata: false });
        console.log("[CustomCollection] findOneAndDelete completed");
        return result;
      } else {
        const result = await super.findOneAndDelete(filter, options || {});
        console.log("[CustomCollection] findOneAndDelete completed");
        return result;
      }
    } catch (error) {
      console.error("[CustomCollection] findOneAndDelete failed:", error);
      throw error;
    }
  }

  // ==================== AGGREGATION ====================

  override aggregate<T extends Document = Document>(
    pipeline?: Document[],
    options?: AggregateOptions & Abortable
  ): AggregationCursor<T>;
  override aggregate(
    pipeline?: Document[],
    options?: AggregateOptions & Abortable
  ): AggregationCursor<Document> {
    console.log("[CustomCollection] aggregate called:", {
      pipelineStages: pipeline?.length || 0,
      options
    });
    return super.aggregate(pipeline, options);
  }

  // ==================== COUNT OPERATIONS ====================

  override async countDocuments(
    filter?: Filter<TSchema>,
    options?: CountDocumentsOptions
  ): Promise<number> {
    console.log("[CustomCollection] countDocuments called:", { filter, options });

    try {
      const count = await super.countDocuments(filter, options);
      console.log("[CustomCollection] countDocuments result:", count);
      return count;
    } catch (error) {
      console.error("[CustomCollection] countDocuments failed:", error);
      throw error;
    }
  }

  override async estimatedDocumentCount(
    options?: EstimatedDocumentCountOptions
  ): Promise<number> {
    console.log("[CustomCollection] estimatedDocumentCount called:", { options });

    try {
      const count = await super.estimatedDocumentCount(options);
      console.log("[CustomCollection] estimatedDocumentCount result:", count);
      return count;
    } catch (error) {
      console.error("[CustomCollection] estimatedDocumentCount failed:", error);
      throw error;
    }
  }

  // ==================== BULK OPERATIONS ====================

  override async bulkWrite(
    operations: AnyBulkWriteOperation<TSchema>[],
    options?: BulkWriteOptions
  ): Promise<BulkWriteResult> {
    console.log("[CustomCollection] bulkWrite called:", {
      operationCount: operations.length,
      options
    });

    // Add timestamps to insert and update operations
    const processedOperations = operations.map(op => {
      if ('insertOne' in op && op.insertOne) {
        return {
          ...op,
          insertOne: {
            ...op.insertOne,
            document: {
              ...op.insertOne.document,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          }
        };
      }

      if ('updateOne' in op && op.updateOne) {
        return {
          ...op,
          updateOne: {
            ...op.updateOne,
            update: {
              ...op.updateOne.update,
              $set: {
                ...((op.updateOne.update as any)?.$set || {}),
                updatedAt: new Date()
              }
            }
          }
        };
      }

      if ('updateMany' in op && op.updateMany) {
        return {
          ...op,
          updateMany: {
            ...op.updateMany,
            update: {
              ...op.updateMany.update,
              $set: {
                ...((op.updateMany.update as any)?.$set || {}),
                updatedAt: new Date()
              }
            }
          }
        };
      }

      return op;
    });

    try {
      const result = await super.bulkWrite(processedOperations, options);
      console.log("[CustomCollection] bulkWrite result:", {
        insertedCount: result.insertedCount,
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
        deletedCount: result.deletedCount,
        upsertedCount: result.upsertedCount
      });
      return result;
    } catch (error) {
      console.error("[CustomCollection] bulkWrite failed:", error);
      throw error;
    }
  }

  // ==================== INDEX OPERATIONS ====================

  override async createIndex(
    indexSpec: IndexSpecification,
    options?: CreateIndexesOptions
  ): Promise<string> {
    console.log("[CustomCollection] createIndex called:", { indexSpec, options });

    try {
      const result = await super.createIndex(indexSpec, options);
      console.log("[CustomCollection] createIndex result:", result);
      return result;
    } catch (error) {
      console.error("[CustomCollection] createIndex failed:", error);
      throw error;
    }
  }

  override async createIndexes(
    indexSpecs: IndexDescription[],
    options?: CreateIndexesOptions
  ): Promise<string[]> {
    console.log("[CustomCollection] createIndexes called:", {
      count: indexSpecs.length,
      options
    });

    try {
      const result = await super.createIndexes(indexSpecs, options);
      console.log("[CustomCollection] createIndexes result:", result);
      return result;
    } catch (error) {
      console.error("[CustomCollection] createIndexes failed:", error);
      throw error;
    }
  }

  override async dropIndex(
    indexSpec: string,
    options?: DropIndexesOptions
  ): Promise<Document> {
    console.log("[CustomCollection] dropIndex called:", { indexSpec, options });

    try {
      const result = await super.dropIndex(indexSpec, options);
      console.log("[CustomCollection] dropIndex completed");
      return result;
    } catch (error) {
      console.error("[CustomCollection] dropIndex failed:", error);
      throw error;
    }
  }

  override async dropIndexes(options?: DropIndexesOptions): Promise<boolean> {
    console.log("[CustomCollection] dropIndexes called:", { options });

    try {
      const result = await super.dropIndexes(options);
      console.log("[CustomCollection] dropIndexes completed");
      return result;
    } catch (error) {
      console.error("[CustomCollection] dropIndexes failed:", error);
      throw error;
    }
  }



  // ==================== CHANGE STREAMS ====================

  override watch<
    TLocal extends Document = TSchema,
    TChange extends Document = ChangeStreamDocument<TLocal>
  >(
    pipeline?: Document[],
    options?: ChangeStreamOptions
  ): ChangeStream<TLocal, TChange> {
    console.log("[CustomCollection] watch called:", {
      pipelineStages: pipeline?.length || 0,
      options
    });
    return super.watch<TLocal, TChange>(pipeline, options);
  }


  /**
   * Find documents with pagination
   */
  async findWithPagination(
    filter: Filter<TSchema> = {},
    page: number = 1,
    limit: number = 10,
    sort: Sort = { _id: 1 }
  ): Promise<{
    documents: WithId<TSchema>[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    console.log("[CustomCollection] findWithPagination called:", {
      filter, page, limit, sort
    });

    const skip = (page - 1) * limit;

    try {
      const [documents, total] = await Promise.all([
        this.find(filter)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .toArray(),
        this.countDocuments(filter)
      ]);

      const result = {
        documents,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      };

      console.log("[CustomCollection] findWithPagination result:", {
        documentsFound: documents.length,
        total,
        totalPages: result.totalPages
      });

      return result;
    } catch (error) {
      console.error("[CustomCollection] findWithPagination failed:", error);
      throw error;
    }
  }

  /**
   * Soft delete implementation
   */
  async softDelete(
    filter: Filter<TSchema>,
    options?: UpdateOptions
  ): Promise<UpdateResult<TSchema>> {
    console.log("[CustomCollection] softDelete called:", { filter, options });

    const update = {
      $set: {
        deletedAt: new Date(),
        updatedAt: new Date()
      }
    } as unknown as UpdateFilter<TSchema>;

    try {
      const result = await this.updateMany(filter, update, options);
      console.log("[CustomCollection] softDelete result:", {
        matched: result.matchedCount,
        modified: result.modifiedCount
      });
      return result;
    } catch (error) {
      console.error("[CustomCollection] softDelete failed:", error);
      throw error;
    }
  }

 

  /**
   * Upsert with timestamps
   */
  async upsertWithTimestamps(
    filter: Filter<TSchema>,
    update: UpdateFilter<TSchema>,
    options?: UpdateOptions
  ): Promise<UpdateResult<TSchema>> {
    console.log("[CustomCollection] upsertWithTimestamps called:", {
      filter, update, options
    });

    const updateWithTimestamps = {
      ...update,
      $set: {
        ...((update as any)?.$set || {}),
        updatedAt: new Date()
      },
      $setOnInsert: {
        ...((update as any)?.$setOnInsert || {}),
        createdAt: new Date()
      }
    } as UpdateFilter<TSchema>;

    const upsertOptions = {
      ...options,
      upsert: true
    };

    try {
      const result = await this.updateOne(filter, updateWithTimestamps, upsertOptions);
      console.log("[CustomCollection] upsertWithTimestamps result:", {
        matched: result.matchedCount,
        modified: result.modifiedCount,
        upserted: result.upsertedCount
      });
      return result;
    } catch (error) {
      console.error("[CustomCollection] upsertWithTimestamps failed:", error);
      throw error;
    }
  }

  /**
   * Health check method
   */
  async healthCheck(): Promise<{
    isConnected: boolean;
    collectionName: string;
    documentCount?: number;
    error?: string;
  }> {
    console.log("[CustomCollection] healthCheck called");

    try {
      const count = await this.estimatedDocumentCount();

      const result = {
        isConnected: true,
        collectionName: this.collectionName,
        documentCount: count
      };

      console.log("[CustomCollection] healthCheck result:", result);
      return result;
    } catch (error) {
      const result = {
        isConnected: false,
        collectionName: this.collectionName,
        error: error instanceof Error ? error.message : String(error)
      };

      console.error("[CustomCollection] healthCheck failed:", result);
      return result;
    }
  }
}

// Type definitions for missing types
interface InsertManyResult<TSchema> {
  acknowledged: boolean;
  insertedCount: number;
  insertedIds: { [key: number]: any };
}

interface ListIndexesCursor {
  toArray(): Promise<Document[]>;
  next(): Promise<Document | null>;
  close(): Promise<void>;
}

interface ChangeStreamDocument<TSchema> {
  _id: any;
  operationType: string;
  clusterTime: any;
  fullDocument?: TSchema;
  ns: {
    db: string;
    coll: string;
  };
  documentKey: {
    _id: any;
  };
}