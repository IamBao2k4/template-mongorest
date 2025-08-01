import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class ListingUserTweetService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "listing-user-tweet": {},
  "get-list": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "67cfbabddada26e67e87ef2d",
          "title": "get list user tweet",
          "entity": "mge-listing-tweet",
          "path_file": "json/response/67cfbabddada26e67e87ef2d.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "7d712452-75a9-45c2-8682-9c5bfaf501bc",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "67c92992f4aa922e5d2a1074"
            }
          ],
          "id": "3dce5d62-7e0f-4cb1-b495-f8af15276815"
        },
        "list_validate": [
          {
            "_id": "67c92992f4aa922e5d2a1074",
            "title": "is-user-active-in-tenant",
            "entity": {
              "_id": "6757b1998659c9e98a2f1e2b",
              "mongodb_collection_name": "user-tenant-level-mapping"
            },
            "path_file": "json/validate/67c92992f4aa922e5d2a1074.json"
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