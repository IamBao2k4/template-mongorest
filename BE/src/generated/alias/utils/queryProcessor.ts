// FastifyRequest type is used in interface definitions
import * as fs from 'fs/promises';
import * as path from 'path';
import { ResponseMapper, createResponseMapper, RequestContext } from './responseMapper';
import { fileURLToPath } from 'url';

export interface QueryValidationRule {
  id: string;
  field: string;
  operator: string;
  valueSource: string;
  value: string;
  rules?: QueryValidationRule[];
  combinator?: string;
  not?: boolean;
}

export interface QueryValidation {
  combinator: string;
  rules: QueryValidationRule[];
  id: string;
}

export interface ListValidation {
  _id: string;
  title: string;
  entity: {
    _id: string;
    mongodb_collection_name: string;
  };
  path_file: string;
}

export interface ResponseConfig {
  _id: string;
  title: string;
  entity: string;
  path_file: string;
}

export interface ValidationConfig {
  notification: any;
  response: ResponseConfig;
  query_validate: QueryValidation;
  list_validate: ListValidation[];
  custom_filter: {
    rules: any[];
  };
}

export interface ProcessedQuery {
  originalQuery: any;
  validationResults: {
    response: any;
    mappedResponse: any;
    queryValidation: boolean;
    listValidations: any[];
  };
  finalQuery: any;
}

export class QueryProcessor {
  private basePath: string;
  private responseMapper: ResponseMapper;

  constructor(basePath: string = path.resolve(__dirname, '../../../')) {
    this.basePath = basePath;
    this.responseMapper = createResponseMapper();
  }

  async processQuery(
    query: any,
    validationConfigs: ValidationConfig[]
  ): Promise<ProcessedQuery> {
    const results: ProcessedQuery = {
      originalQuery: query,
      validationResults: {
        response: null,
        mappedResponse: null,
        queryValidation: true, // Default to true since we're not validating query_validate anymore
        listValidations: []
      },
      finalQuery: null
    };

    for (const config of validationConfigs) {
      // Load response configuration
      const responseConfig = await this.loadJsonFile(config.response.path_file);
      
      // Merge response config with original response data (to preserve entity field)
      const mergedResponseConfig = {
        ...responseConfig,
        entity: config.response.entity,
        _id: config.response._id,
        title: config.response.title
      };
      
      results.validationResults.response = mergedResponseConfig;

      // Create request context for mapping
      const requestContext: RequestContext = this.responseMapper.setDefaults({
        params: query.params || {},
        query: query.query || {},
        body: query.body || {},
        headers: query.headers || {}
      });

      // Map response config with actual values
      const mappedResponse = this.responseMapper.mapResponse(mergedResponseConfig, requestContext);
      results.validationResults.mappedResponse = mappedResponse;

      // Process list validations only (skip query_validate)
      for (const listValidation of config.list_validate) {
        const validationData = await this.loadJsonFile(listValidation.path_file);
        results.validationResults.listValidations.push({
          id: listValidation._id,
          title: listValidation.title,
          entity: listValidation.entity,
          data: validationData
        });
      }

      // Build final query based on mapped response config and validation results
      results.finalQuery = this.buildFinalQuery(
        query,
        mappedResponse,
        results.validationResults
      );
    }

    return results;
  }

  private async loadJsonFile(filePath: string): Promise<any> {
    try {
      const fullPath = path.join(this.basePath, filePath);
      const content = await fs.readFile(fullPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error loading JSON file ${filePath}:`, error);
      return null;
    }
  }

  // Removed query validation methods - will be handled separately

  private buildFinalQuery(
    originalQuery: any,
    responseConfig: any,
    validationResults: any
  ): any {
    // Build the final query structure that will be passed to your core
    const finalQuery = {
      ...originalQuery,
      responseConfig: responseConfig,
      validationPassed: validationResults.queryValidation,
      validationData: validationResults.listValidations,
      timestamp: new Date().toISOString()
    };

    return finalQuery;
  }
}

// Factory function for easy usage
export function createQueryProcessor(basePath?: string): QueryProcessor {
  return new QueryProcessor(basePath);
}