import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class CourseCategoriesService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "course-categories": {},
  "post": {
    "headers": [
      {
        "value": "x-tenant-id",
        "key": "x-tenant-id"
      }
    ],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "6854e82eced3311bbefc6bbc",
          "title": "create categories",
          "entity": "mge-categories",
          "path_file": "json/response/6854e82eced3311bbefc6bbc.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "63524f56-3855-4019-8584-00080a412ecd",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6854ea8fced3311bbefc6bd9"
            }
          ],
          "id": "0ca153d8-2b5e-4a81-8dd1-02ce39c8aef1"
        },
        "list_validate": [
          {
            "_id": "6854ea8fced3311bbefc6bd9",
            "title": "is-user-has-full-permission",
            "entity": {
              "_id": "6740251baefaffc3e4662e6b",
              "mongodb_collection_name": "tenant"
            },
            "path_file": "json/validate/6854ea8fced3311bbefc6bd9.json"
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
          "_id": "6854ebceced3311bbefc6c2a",
          "title": "update course categories",
          "entity": "mge-categories",
          "path_file": "json/response/6854ebceced3311bbefc6c2a.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "0d762b16-0282-4ad4-9fa8-a387922a656d",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6854ea8fced3311bbefc6bd9"
            }
          ],
          "id": "841d4513-d817-4ca2-9ed7-85870c3232bd"
        },
        "list_validate": [
          {
            "_id": "6854ea8fced3311bbefc6bd9",
            "title": "is-user-has-full-permission",
            "entity": {
              "_id": "6740251baefaffc3e4662e6b",
              "mongodb_collection_name": "tenant"
            },
            "path_file": "json/validate/6854ea8fced3311bbefc6bd9.json"
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
          "_id": "6858f15347298d6d7137f6a6",
          "title": "delete course catgories",
          "entity": "mge-categories",
          "path_file": "json/response/6858f15347298d6d7137f6a6.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "65a83ac7-3d1b-4e30-a803-cfe4cece918f",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6854ea8fced3311bbefc6bd9"
            }
          ],
          "id": "2eac2637-8603-40f0-ab3d-424119dfac71"
        },
        "list_validate": [
          {
            "_id": "6854ea8fced3311bbefc6bd9",
            "title": "is-user-has-full-permission",
            "entity": {
              "_id": "6740251baefaffc3e4662e6b",
              "mongodb_collection_name": "tenant"
            },
            "path_file": "json/validate/6854ea8fced3311bbefc6bd9.json"
          }
        ],
        "custom_filter": {
          "rules": []
        }
      }
    ]
  },
  "get-tree": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "6874a4d988088ea179afd2cb",
          "title": "Get tree course categories",
          "entity": "mge-categories",
          "path_file": "json/response/6874a4d988088ea179afd2cb.json"
        },
        "query_validate": {},
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
          "_id": "6874b02ccc29ac11af780b96",
          "title": "set tree course categories",
          "entity": "mge-categories",
          "path_file": "json/response/6874b02ccc29ac11af780b96.json"
        },
        "query_validate": {},
        "list_validate": [],
        "custom_filter": {
          "rules": []
        }
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
          "_id": "6785ed48ec1472e4bc443688",
          "title": "get list categories",
          "entity": "mge-categories",
          "path_file": "json/response/6785ed48ec1472e4bc443688.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [],
          "id": "fa929057-e169-4f8d-ae45-ad67f8505a7c"
        },
        "list_validate": [],
        "custom_filter": {
          "rules": []
        }
      }
    ]
  },
  "get-detail": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "67861e835b126d1f3fd58f65",
          "title": "get detail course",
          "entity": "mge-courses",
          "path_file": "json/response/67861e835b126d1f3fd58f65.json"
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