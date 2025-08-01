import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class CourseUserStatisticService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "course-user-statistic": {},
  "get-detail": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "6822c6d61d50e98cb4b496cc",
          "title": "get detail user's course statistic",
          "entity": "mge-course-member",
          "path_file": "json/response/6822c6d61d50e98cb4b496cc.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "7b8c7bd8-b847-4b66-b576-fc7d0984b83b",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678636df6d9b09071159c329"
            }
          ],
          "id": "52fb46ec-67e4-440c-a726-b357ddd616c4"
        },
        "list_validate": [
          {
            "_id": "678636df6d9b09071159c329",
            "title": "is-course-instructor or course-assistant",
            "entity": {
              "_id": "67853fcd4c9747dfaeed5f84",
              "mongodb_collection_name": "mge-course-member"
            },
            "path_file": "json/validate/678636df6d9b09071159c329.json"
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