import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class UserCollectionTweetService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "user-collection-tweet": {},
  "get-list": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "67bc44af2692eef9b7ab7f02",
          "title": "get list tweet in collection",
          "entity": "mge-user-collections",
          "path_file": "json/response/67bc44af2692eef9b7ab7f02.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [],
          "id": "9b7f9d49-4c88-47a6-a383-12cc71ba4d82"
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