import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class CourseUserTenantProfileService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "course-user-tenant-profile": {},
  "get-detail": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "67f49c22b3f8c11eb1bf6236",
          "title": "get detail course user tenant profile",
          "entity": "user-tenant-profile",
          "path_file": "json/response/67f49c22b3f8c11eb1bf6236.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "01050ea8-1875-4498-b569-2f0874a16ca0",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678539794c9747dfaeed5f39"
            }
          ],
          "id": "5dce0fb5-d5c9-4493-8ca4-6a741ed307e3"
        },
        "list_validate": [
          {
            "_id": "678539794c9747dfaeed5f39",
            "title": "is-user-active",
            "entity": {
              "_id": "6749933810905d9ddbd0104b",
              "mongodb_collection_name": "user"
            },
            "path_file": "json/validate/678539794c9747dfaeed5f39.json"
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