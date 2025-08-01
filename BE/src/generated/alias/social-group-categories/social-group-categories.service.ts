import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class SocialGroupCategoriesService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "social-group-categories": {},
  "get-detail": {
    "headers": [],
    "params": [],
    "body": []
  },
  "get-tree": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "68708a85879efc9e6a322057",
          "title": "get tree",
          "entity": "mge-group-category",
          "path_file": "json/response/68708a85879efc9e6a322057.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [],
          "id": "d7107662-84e3-4e10-a0a4-34d3c23f4620"
        },
        "list_validate": [],
        "custom_filter": {
          "rules": []
        }
      }
    ]
  },
  "set-tree": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "6870bc26e402e2a4ec285ba2",
          "title": "set tree group categories",
          "entity": "mge-group-category",
          "path_file": "json/response/6870bc26e402e2a4ec285ba2.json"
        },
        "query_validate": {},
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


  async getDetail(request: FastifyRequest): Promise<any> {
    const methodConfig = this.config['get-detail'];
    
    // Build query from request parameters
    const query = {
      method: 'get-detail',
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