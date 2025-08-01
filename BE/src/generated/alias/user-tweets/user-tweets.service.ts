import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class UserTweetsService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "user-tweets": {},
  "get-list": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "6764fab46e57acaf6815ae07",
          "title": "Get list tweet by created_by (all status and type)",
          "path_file": "json/response/6764fab46e57acaf6815ae07.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "47cda3da-2ff3-4487-af6a-6a78a7f07c16",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            },
            {
              "id": "b96934ec-330a-4f6a-b714-bc0e66cbaa30",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "67e3c968b71e02cb566ec6fb"
            }
          ],
          "id": "921b19fb-de69-4670-bbfd-0f44f313b796"
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
          },
          {
            "_id": "67e3c968b71e02cb566ec6fb",
            "title": "is-user-from-jwt",
            "entity": {
              "_id": "6749933810905d9ddbd0104b",
              "mongodb_collection_name": "user"
            },
            "path_file": "json/validate/67e3c968b71e02cb566ec6fb.json"
          }
        ],
        "custom_filter": {
          "rules": []
        }
      },
      {
        "notification": {},
        "response": {
          "_id": "67e3c855b71e02cb566ec60a",
          "title": "get list user tweet (user not from jwt)",
          "entity": "mge-group",
          "path_file": "json/response/67e3c855b71e02cb566ec60a.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [],
          "id": "195c04b9-fedb-4741-bf27-6a68b3764062"
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