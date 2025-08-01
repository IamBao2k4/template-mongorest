import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class TenantSettingService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "tenant-setting": {},
  "get-list": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "67b4bad14cd70d34a3f028fb",
          "title": "get info tenant ",
          "entity": "tenant",
          "path_file": "json/response/67b4bad14cd70d34a3f028fb.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [],
          "id": "ccf3208d-801d-489d-b463-f6523fcb618e"
        },
        "list_validate": [],
        "custom_filter": {
          "rules": []
        }
      },
      {
        "notification": {},
        "response": {},
        "query_validate": {
          "combinator": "and",
          "rules": [],
          "id": "0b59f9a4-099a-4eec-b71a-45b4082b0614"
        },
        "list_validate": [],
        "custom_filter": {
          "rules": []
        }
      }
    ]
  }
};
    this.queryProcessor = createQueryProcessor();
  }

  async getList(request: FastifyRequest): Promise<any> {
    const methodConfig = this.config['get-list'];
    
    // Build query from request parameters
    const query = {
      method: 'get-list',
      params: { ...(request.params as object), ...(request.query as object) },
      query: request.query,
      body: request.body,
      headers: request.headers
    };
    
    // Process query with validation
    const processedQuery = await this.queryProcessor.processQuery(
      query,
      methodConfig.validate
    );
    
    // Execute MongoDB aggregation
    const result = await this.InstanceQuery.executeMongoAggregation(processedQuery);

    return {
      result: result,
      input: query
    };
  }




}