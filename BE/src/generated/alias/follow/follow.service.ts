import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class FollowService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "follow": {},
  "post": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {
          "_id": "67da678cbab79a925cd30e69",
          "path_file": "json/notification/67da678cbab79a925cd30e69.json"
        },
        "response": {
          "_id": "6775fdde3c56caf3d6e34f42",
          "title": "follow user",
          "entity": "mge-user-follow",
          "path_file": "json/response/6775fdde3c56caf3d6e34f42.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "cebfb68f-f0d6-4694-9a00-7ac128449bca",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            }
          ],
          "id": "2d333f01-6fd1-4dea-aae4-955e9696e281"
        },
        "list_validate": [
          {
            "_id": "675a8e9b0f44fc1769fdea90",
            "title": "is-user-active 1",
            "entity": {
              "_id": "6749933810905d9ddbd0104b",
              "mongodb_collection_name": "user"
            },
            "path_file": "json/validate/675a8e9b0f44fc1769fdea90.json"
          }
        ],
        "custom_filter": {
          "rules": []
        }
      }
    ]
  },
  "delete": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "6776017b3c56caf3d6e34fbd",
          "title": "unfollow user",
          "entity": "mge-user-follow",
          "path_file": "json/response/6776017b3c56caf3d6e34fbd.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [],
          "id": "ef6c9303-e916-45b4-b06f-4acfdd62ded4"
        },
        "list_validate": [
          {
            "_id": "675a8e9b0f44fc1769fdea90",
            "title": "is-user-active 1",
            "entity": {
              "_id": "6749933810905d9ddbd0104b",
              "mongodb_collection_name": "user"
            },
            "path_file": "json/validate/675a8e9b0f44fc1769fdea90.json"
          }
        ],
        "custom_filter": {
          "rules": []
        }
      }
    ]
  }
};
    this.queryProcessor = createQueryProcessor();
  }



  async create(request: FastifyRequest): Promise<any> {
    const methodConfig = this.config['post'];
    
    // Build query from request parameters
    const query = {
      method: 'create',
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






  async delete(request: FastifyRequest): Promise<any> {
    const methodConfig = this.config['delete'];
    
    // Build query from request parameters
    const query = {
      method: 'delete',
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