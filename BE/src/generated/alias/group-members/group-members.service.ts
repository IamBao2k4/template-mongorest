import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class GroupMembersService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "group-members": {},
  "get-list": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "676cd0ca4ec833ce93a07e2c",
          "title": "Get list group's members with status is pending",
          "path_file": "json/response/676cd0ca4ec833ce93a07e2c.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "017cd98f-9502-4a72-bae0-4135a1adc5b5",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            },
            {
              "id": "739c196a-0f8f-4b00-aef9-b80bd9eaba09",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "67a588e7b45a45be2aa96776"
            },
            {
              "id": "078d522d-9a1a-499a-bc79-8e930a6178de",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6759411a2fbf378066198410"
            },
            {
              "id": "5179b437-c5be-4443-812e-e8549a55d3ac",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675aa172049b30e1807cee21"
            }
          ],
          "id": "52ff7f3c-3e3a-4b26-bc76-8ac395ab702c"
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
            "_id": "6759411a2fbf378066198410",
            "title": "is-group-manager or group-owner",
            "entity": {
              "_id": "674810a776462b61b5df8ece",
              "mongodb_collection_name": "mge-group-member"
            },
            "path_file": "json/validate/6759411a2fbf378066198410.json"
          },
          {
            "_id": "675aa172049b30e1807cee21",
            "title": "is-user-has-permission-add-member-to-group",
            "entity": {
              "_id": "674810a776462b61b5df8ece",
              "mongodb_collection_name": "mge-group-member"
            },
            "path_file": "json/validate/675aa172049b30e1807cee21.json"
          },
          {
            "_id": "67a588e7b45a45be2aa96776",
            "title": "user-joined-group (no status)",
            "entity": {
              "_id": "674810a776462b61b5df8ece",
              "mongodb_collection_name": "mge-group-member"
            },
            "path_file": "json/validate/67a588e7b45a45be2aa96776.json"
          }
        ],
        "custom_filter": {
          "id": "cd5f36ae-3058-449d-b08f-b2193dbd6e89",
          "rules": [
            {
              "id": "940510bf-0ccf-4d9c-9e92-50c74ce05cb4",
              "field": "@param:status[]",
              "operator": "=",
              "valueSource": "value",
              "value": "pending"
            }
          ],
          "combinator": "and",
          "not": false
        }
      },
      {
        "notification": {},
        "response": {
          "_id": "6763cefb0ac6cdefe65cde7c",
          "title": "Get list group members",
          "entity": "mge-group-member",
          "path_file": "json/response/6763cefb0ac6cdefe65cde7c.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "3afb9b22-b6db-46c6-af8e-94dcf7fd23a6",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            },
            {
              "id": "1adaf551-4d79-44b6-ad37-8caab6c212f7",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "67a588e7b45a45be2aa96776"
            }
          ],
          "id": "64a92110-bf75-4142-8076-669042bb068e"
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
            "_id": "67a588e7b45a45be2aa96776",
            "title": "user-joined-group (no status)",
            "entity": {
              "_id": "674810a776462b61b5df8ece",
              "mongodb_collection_name": "mge-group-member"
            },
            "path_file": "json/validate/67a588e7b45a45be2aa96776.json"
          }
        ],
        "custom_filter": {
          "rules": []
        }
      }
    ]
  },
  "post": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "675ff5825a1356463269cfe8",
          "title": "Add group's member",
          "path_file": "json/response/675ff5825a1356463269cfe8.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "992ad4cf-2e93-44e3-ba15-6634e2f7b3f1",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            },
            {
              "id": "e9cbb0b5-3124-4c6b-85f5-7ea756b18869",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6759411a2fbf378066198410"
            },
            {
              "id": "524d040b-b847-40a7-969f-227d364f67a1",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675aa172049b30e1807cee21"
            },
            {
              "id": "2b2e7661-4c23-4dfd-bb79-2f882dd90a63",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "67d276ceb6962f9420f4114a"
            }
          ],
          "id": "6b95bd9b-8d2f-44ef-ab79-077bbf795879"
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
            "_id": "6759411a2fbf378066198410",
            "title": "is-group-manager or group-owner",
            "entity": {
              "_id": "674810a776462b61b5df8ece",
              "mongodb_collection_name": "mge-group-member"
            },
            "path_file": "json/validate/6759411a2fbf378066198410.json"
          },
          {
            "_id": "675aa172049b30e1807cee21",
            "title": "is-user-has-permission-add-member-to-group",
            "entity": {
              "_id": "674810a776462b61b5df8ece",
              "mongodb_collection_name": "mge-group-member"
            },
            "path_file": "json/validate/675aa172049b30e1807cee21.json"
          },
          {
            "_id": "67d276ceb6962f9420f4114a",
            "title": "is-group-in-tenant",
            "entity": {
              "_id": "6747ef07c47463d88f8c5ab1",
              "mongodb_collection_name": "mge-group"
            },
            "path_file": "json/validate/67d276ceb6962f9420f4114a.json"
          }
        ],
        "custom_filter": {
          "rules": []
        }
      }
    ]
  },
  "put": {
    "headers": [
      {
        "value": "user.id",
        "key": "user.id"
      }
    ],
    "params": [
      {
        "value": "group_id",
        "key": "group_id"
      },
      {
        "value": "_id",
        "key": "_id"
      }
    ],
    "body": [
      {
        "value": "social_group",
        "key": "social_group"
      }
    ],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "676d12a54ec833ce93a08403",
          "title": "Update group's member",
          "entity": "mge-group-member",
          "path_file": "json/response/676d12a54ec833ce93a08403.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "b2db34e5-58a5-4d02-8684-b257ebdedc7b",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            },
            {
              "id": "d69d6534-7d58-49db-890f-bab944b2b9b9",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "674d2f9f4b5b2e5f92441d16"
            },
            {
              "id": "9cf04016-dfb5-4e5d-ad6a-89c26b63659d",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6759411a2fbf378066198410"
            },
            {
              "id": "a3b32cfe-25a0-4745-b94d-828690ea65a6",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675aaa34049b30e1807cf4e5"
            }
          ],
          "id": "634e779e-4f1c-4a76-bfe7-931b47cf27ae"
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
            "_id": "674d2f9f4b5b2e5f92441d16",
            "title": "user-joined-group",
            "entity": {
              "_id": "674810a776462b61b5df8ece",
              "mongodb_collection_name": "mge-group-member"
            },
            "path_file": "json/validate/674d2f9f4b5b2e5f92441d16.json"
          },
          {
            "_id": "6759411a2fbf378066198410",
            "title": "is-group-manager or group-owner",
            "entity": {
              "_id": "674810a776462b61b5df8ece",
              "mongodb_collection_name": "mge-group-member"
            },
            "path_file": "json/validate/6759411a2fbf378066198410.json"
          },
          {
            "_id": "675aaa34049b30e1807cf4e5",
            "title": "is-user-has-permission-update-group-member",
            "entity": {
              "_id": "674810a776462b61b5df8ece",
              "mongodb_collection_name": "mge-group-member"
            },
            "path_file": "json/validate/675aaa34049b30e1807cf4e5.json"
          }
        ],
        "custom_filter": {
          "rules": []
        }
      },
      {
        "notification": {},
        "response": {
          "_id": "677ba60a44af0385d64b40c9",
          "title": "leave group",
          "entity": "mge-group-member",
          "path_file": "json/response/677ba60a44af0385d64b40c9.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "85b0959f-9c44-4b43-b88e-6a5fdb8a3d58",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            },
            {
              "id": "a4f72573-bd23-477f-8f4f-9f05e1703f93",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "674d2f9f4b5b2e5f92441d16"
            }
          ],
          "id": "91c17c17-cc68-4fec-99b7-43eec1858dc1"
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
            "_id": "674d2f9f4b5b2e5f92441d16",
            "title": "user-joined-group",
            "entity": {
              "_id": "674810a776462b61b5df8ece",
              "mongodb_collection_name": "mge-group-member"
            },
            "path_file": "json/validate/674d2f9f4b5b2e5f92441d16.json"
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
          "_id": "676d1c944ec833ce93a08614",
          "title": "Delete group's member",
          "entity": "mge-group-member",
          "path_file": "json/response/676d1c944ec833ce93a08614.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "54aca474-50c6-4c33-aa75-8ccc3e5a5051",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            },
            {
              "id": "fa640c50-3518-49ed-84bb-6ca1c65d7edd",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "674d2f9f4b5b2e5f92441d16"
            },
            {
              "id": "2377d9b6-cc56-4a57-a2de-036f0701fa5a",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6759411a2fbf378066198410"
            }
          ],
          "id": "6b882de1-87f0-4c0f-8013-77c5a394f0f8"
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
            "_id": "674d2f9f4b5b2e5f92441d16",
            "title": "user-joined-group",
            "entity": {
              "_id": "674810a776462b61b5df8ece",
              "mongodb_collection_name": "mge-group-member"
            },
            "path_file": "json/validate/674d2f9f4b5b2e5f92441d16.json"
          },
          {
            "_id": "6759411a2fbf378066198410",
            "title": "is-group-manager or group-owner",
            "entity": {
              "_id": "674810a776462b61b5df8ece",
              "mongodb_collection_name": "mge-group-member"
            },
            "path_file": "json/validate/6759411a2fbf378066198410.json"
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
}