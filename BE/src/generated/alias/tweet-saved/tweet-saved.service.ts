import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class TweetSavedService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "tweet-saved": {},
  "post": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "675b9b9a9279b9d81247c41c",
          "title": "Create tweet saved ",
          "entity": "mge-tweet-saved",
          "path_file": "json/response/675b9b9a9279b9d81247c41c.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "a7397366-098e-4af9-9c78-7fc4021c5f1f",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            },
            {
              "id": "d3e2a6f3-19bb-4215-9992-184560f14aee",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675c0174a6c844dbf47f50c9"
            }
          ],
          "id": "6a9f1b27-e99c-4f15-90c3-89c84a20ead6"
        },
        "list_validate": [
          {
            "_id": "675a8e9b0f44fc1769fdea90",
            "title": "is-user-active",
            "entity": {
              "_id": "6749933810905d9ddbd0104b",
              "mongodb_collection_name": "user"
            },
            "path_file": "json/validate/675a8e9b0f44fc1769fdea90.json"
          },
          {
            "_id": "675c0174a6c844dbf47f50c9",
            "title": "is-tweet-active",
            "entity": {
              "_id": "6747ef07c47463d88f8c5ab1",
              "mongodb_collection_name": "mge-group"
            },
            "path_file": "json/validate/675c0174a6c844dbf47f50c9.json"
          }
        ],
        "custom_filter": {
          "id": "8b1c706a-1348-432b-9c9a-aead90ae440f",
          "rules": [],
          "combinator": "and",
          "not": false
        },
        "trigger_pipeline": ""
      }
    ]
  },
  "get-list": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "67720643e427f6baf673e6f0",
          "title": "get list tweet saved of collection",
          "entity": "mge-group",
          "path_file": "json/response/67720643e427f6baf673e6f0.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "a6cf0f01-3ce6-45f2-8f7f-87d18e951298",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            },
            {
              "id": "6af91797-9add-48d4-853b-b2607611c2d3",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "67629dec827c314d42b97a98"
            }
          ],
          "id": "fae8e6d7-200b-4577-975b-92ddd27ad92b"
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
            "_id": "67629dec827c314d42b97a98",
            "title": "is-user-collection-is-mine",
            "entity": {
              "_id": "675b99f99279b9d81247c3ba",
              "mongodb_collection_name": "mge-user-collections"
            },
            "path_file": "json/validate/67629dec827c314d42b97a98.json"
          }
        ],
        "custom_filter": {
          "id": "cc220a20-364b-418e-a483-57a1a4e796e0",
          "rules": [
            {
              "id": "36a9f9a9-ce2e-4c0f-bde1-d558ed25d9a7",
              "field": "@param:is_root",
              "operator": "=",
              "valueSource": "value",
              "value": "false"
            }
          ],
          "combinator": "and",
          "not": false
        }
      },
      {
        "notification": {},
        "response": {
          "_id": "67c4177ccb2d3f0de04839e9",
          "title": "get list tweet saved of watch later collection",
          "entity": "mge-tweet",
          "path_file": "json/response/67c4177ccb2d3f0de04839e9.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "1791f5d2-23fb-4d8d-9a61-53cc2e21b246",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            }
          ],
          "id": "310294d2-9575-4954-84f8-7994feb7c84c"
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
          "id": "9f46a29b-231e-4bb1-8875-8ee506c48420",
          "rules": [
            {
              "id": "1fe68dfd-1905-4851-90b7-f3dd3f2a49dc",
              "field": "@param:is_root",
              "operator": "=",
              "valueSource": "value",
              "value": "true"
            }
          ],
          "combinator": "and",
          "not": false
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
          "_id": "676d7edf1799c94c7eba2e58",
          "title": "Delete tweet saved",
          "entity": "mge-tweet-saved",
          "path_file": "json/response/676d7edf1799c94c7eba2e58.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "b9bf0503-632d-46f8-b20c-d386a7960788",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            },
            {
              "id": "4132ee21-e84e-428b-8cab-7e0b02bbdc09",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675c0174a6c844dbf47f50c9"
            }
          ],
          "id": "2efc3556-65fb-4c4c-8cbd-e746689bd2b9"
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
            "_id": "675c0174a6c844dbf47f50c9",
            "title": "is-tweet-active AND group-active",
            "entity": {
              "_id": "6747ef07c47463d88f8c5ab1",
              "mongodb_collection_name": "mge-group"
            },
            "path_file": "json/validate/675c0174a6c844dbf47f50c9.json"
          }
        ],
        "custom_filter": {
          "rules": []
        }
      }
    ]
  },
  "put": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "67765d8d06b2e962c0be705a",
          "title": "update tweet saved",
          "entity": "mge-tweet-saved",
          "path_file": "json/response/67765d8d06b2e962c0be705a.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "07ff91a5-9a8c-4b63-ba0a-6224bb589e65",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            },
            {
              "id": "de6e06c0-b0e3-4c76-9e9d-711328e55c38",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "67629dec827c314d42b97a98"
            }
          ],
          "id": "e22880ef-d4f9-4c00-ab9f-9dc1f9e6f057"
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
            "_id": "67629dec827c314d42b97a98",
            "title": "is-user-collection-is-mine",
            "entity": {
              "_id": "675b99f99279b9d81247c3ba",
              "mongodb_collection_name": "mge-user-collections"
            },
            "path_file": "json/validate/67629dec827c314d42b97a98.json"
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



  async update(request: FastifyRequest): Promise<any> {
    const methodConfig = this.config['put'];
    
    // Build query from request parameters
    const query = {
      method: 'update',
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