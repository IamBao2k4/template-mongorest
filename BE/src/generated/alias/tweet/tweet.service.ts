import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class TweetService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "tweet": {},
  "get-list": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "676524ca6e57acaf6815af33",
          "title": "Get list tweet group (all)",
          "entity": "mge-tweet",
          "path_file": "json/response/676524ca6e57acaf6815af33.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "0680ea4d-bafc-410d-a825-dd40108f5750",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            }
          ],
          "id": "167fd7e2-6c76-45fe-8a15-7dbda5bb53fc"
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
      },
      {
        "notification": {},
        "response": {
          "_id": "67a47ec8b45a45be2aa951a9",
          "title": "get list tweet belongs to groups public",
          "entity": "mge-group",
          "path_file": "json/response/67a47ec8b45a45be2aa951a9.json"
        },
        "query_validate": {
          "combinator": "or",
          "rules": [
            {
              "id": "001a5a62-ffef-4d1a-ae40-faa23ded4bae",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6763a69466e06fcc01e7540e"
            },
            {
              "id": "6babb5f6-66b6-4c25-808b-740721cd33c2",
              "rules": [
                {
                  "id": "ee176499-3239-4db8-a2e9-afd7c0360c06",
                  "field": "data",
                  "operator": "=",
                  "valueSource": "value",
                  "value": "6763a6c166e06fcc01e75420"
                },
                {
                  "id": "dc857cda-4f0b-41ac-aa90-0200484f9f37",
                  "field": "data",
                  "operator": "=",
                  "valueSource": "value",
                  "value": "675a8e9b0f44fc1769fdea90"
                }
              ],
              "combinator": "and",
              "not": false
            }
          ],
          "id": "0d26ce2c-6cee-4e33-b5d4-cc83c12eef25"
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
            "_id": "6763a69466e06fcc01e7540e",
            "title": "is-tenant-public",
            "entity": {
              "_id": "6740251baefaffc3e4662e6b",
              "mongodb_collection_name": "tenant"
            },
            "path_file": "json/validate/6763a69466e06fcc01e7540e.json"
          },
          {
            "_id": "6763a6c166e06fcc01e75420",
            "title": "is-tenant-private",
            "entity": {
              "_id": "6740251baefaffc3e4662e6b",
              "mongodb_collection_name": "tenant"
            },
            "path_file": "json/validate/6763a6c166e06fcc01e75420.json"
          }
        ],
        "custom_filter": {
          "id": "d0cc35e3-009f-49d1-8741-df036317b80f",
          "rules": [],
          "combinator": "and",
          "not": false
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