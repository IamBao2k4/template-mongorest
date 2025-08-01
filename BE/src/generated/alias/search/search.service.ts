import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class SearchService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "content-course": {},
  "get-list": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "68621419b706fe52297c08b1",
          "title": "search content course by keyword",
          "entity": "mge-chapters",
          "path_file": "json/response/68621419b706fe52297c08b1.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "28e298df-e245-4f4a-b56d-9fe1e4fc2c68",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678539794c9747dfaeed5f39"
            }
          ],
          "id": "8256f729-8c27-4216-8bdd-1729305fd479"
        },
        "list_validate": [
          {
            "_id": "678539794c9747dfaeed5f39",
            "title": "is-user-active-in-tenant",
            "entity": {
              "_id": "67aad740a67aaa1951ca64b0",
              "mongodb_collection_name": "user-tenant-profile"
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