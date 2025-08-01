import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class LessonService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "lesson": {},
  "post": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "6786582f6d9b09071159c439",
          "title": "create lesson",
          "entity": "mge-lessons",
          "path_file": "json/response/6786582f6d9b09071159c439.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "a756a727-31f8-4422-8d09-9e004aa99097",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678539794c9747dfaeed5f39"
            },
            {
              "id": "1119ae45-5766-406b-908c-aa2e18c3170c",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "67862ea941c99c2031416254"
            },
            {
              "id": "023bd795-0fd7-4ede-b132-842abe9a97bc",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678636df6d9b09071159c329"
            },
            {
              "id": "cd8b8eb4-afdf-4a28-bfd3-ab33bdbb1ca6",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678675d86d9b09071159c4ab"
            }
          ],
          "id": "aaa36fdc-4a45-4fda-aadd-bc1501d3c525"
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
          },
          {
            "_id": "67862ea941c99c2031416254",
            "title": "user-joined-course",
            "entity": {
              "_id": "67853fcd4c9747dfaeed5f84",
              "mongodb_collection_name": "mge-course-member"
            },
            "path_file": "json/validate/67862ea941c99c2031416254.json"
          },
          {
            "_id": "678636df6d9b09071159c329",
            "title": "is-course-instructor or course-assistant",
            "entity": {
              "_id": "67853fcd4c9747dfaeed5f84",
              "mongodb_collection_name": "mge-course-member"
            },
            "path_file": "json/validate/678636df6d9b09071159c329.json"
          },
          {
            "_id": "678675d86d9b09071159c4ab",
            "title": "is-user-has-permission-to-create-lesson",
            "entity": {
              "_id": "67853fcd4c9747dfaeed5f84",
              "mongodb_collection_name": "mge-course-member"
            },
            "path_file": "json/validate/678675d86d9b09071159c4ab.json"
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
          "_id": "678682bc6d9b09071159c4f2",
          "title": "update lesson",
          "entity": "mge-lessons",
          "path_file": "json/response/678682bc6d9b09071159c4f2.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "db71ec99-1acb-4e74-814f-e2ccb3ef4061",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678539794c9747dfaeed5f39"
            },
            {
              "id": "b45c287e-b2fd-47c3-aed9-31b6ab47b5a5",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "67862ea941c99c2031416254"
            },
            {
              "id": "ce7b9625-c4be-48ac-882c-ce7e4ae07c8e",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678636df6d9b09071159c329"
            },
            {
              "id": "fdf98735-9c9f-4952-b6c7-da5a1cabc636",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678681b36d9b09071159c4e9"
            }
          ],
          "id": "e6178e77-beff-453d-903f-8e65d55918d5"
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
          },
          {
            "_id": "678681b36d9b09071159c4e9",
            "title": "is-user-has-permission-to-manage-lesson",
            "entity": {
              "_id": "67853fcd4c9747dfaeed5f84",
              "mongodb_collection_name": "mge-course-member"
            },
            "path_file": "json/validate/678681b36d9b09071159c4e9.json"
          },
          {
            "_id": "67862ea941c99c2031416254",
            "title": "user-joined-course",
            "entity": {
              "_id": "67853fcd4c9747dfaeed5f84",
              "mongodb_collection_name": "mge-course-member"
            },
            "path_file": "json/validate/67862ea941c99c2031416254.json"
          },
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
  },
  "get-list": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "67868609aadb7b67e278f093",
          "title": "get list course's lessons",
          "entity": "mge-lessons",
          "path_file": "json/response/67868609aadb7b67e278f093.json"
        },
        "query_validate": {
          "combinator": "or",
          "rules": [
            {
              "id": "1949acea-70c1-4882-a799-415990d6c135",
              "rules": [
                {
                  "id": "dcc4cb75-c628-44d2-ae8c-e94951301f4e",
                  "field": "data",
                  "operator": "=",
                  "valueSource": "value",
                  "value": "6784f4dd8145c207b78a9972"
                },
                {
                  "id": "05d06ca8-8094-4a9a-966c-0cdf64276861",
                  "rules": [
                    {
                      "id": "1c2fa0f8-ed61-4588-b165-174332e2ea5d",
                      "field": "data",
                      "operator": "=",
                      "valueSource": "value",
                      "value": "678635516d9b09071159c2d8"
                    },
                    {
                      "id": "112f56b9-e50c-409c-9769-2417e0a302e7",
                      "rules": [
                        {
                          "id": "68e3cad3-838c-4f47-aa61-cb5f67e0d01a",
                          "field": "data",
                          "operator": "=",
                          "valueSource": "value",
                          "value": "67862ea941c99c2031416254"
                        },
                        {
                          "id": "7848dfb0-236c-46cc-9b61-d68cd146eed7",
                          "field": "data",
                          "operator": "=",
                          "valueSource": "value",
                          "value": "678539794c9747dfaeed5f39"
                        }
                      ],
                      "combinator": "and",
                      "not": false
                    }
                  ],
                  "combinator": "or",
                  "not": false
                }
              ],
              "combinator": "and",
              "not": false
            },
            {
              "id": "0606d4fa-3d80-4cab-9de0-e2ca6520758b",
              "rules": [
                {
                  "id": "9fe67a2e-62b2-419a-8e78-36d529dc8100",
                  "field": "data",
                  "operator": "=",
                  "valueSource": "value",
                  "value": "6784f56b4c9747dfaeed5ca6"
                },
                {
                  "id": "dd284012-de0f-489c-832d-3e40f62a1c53",
                  "field": "data",
                  "operator": "=",
                  "valueSource": "value",
                  "value": "678539794c9747dfaeed5f39"
                },
                {
                  "id": "a2462bf1-8f8a-4381-8c8d-bacfc2e4c828",
                  "rules": [
                    {
                      "id": "fe768d42-7a2e-4035-9279-ddf2fdf80e5d",
                      "field": "data",
                      "operator": "=",
                      "valueSource": "value",
                      "value": "678635516d9b09071159c2d8"
                    },
                    {
                      "id": "a7ce5d3d-679d-4bea-9473-b06390636a9c",
                      "field": "data",
                      "operator": "=",
                      "valueSource": "value",
                      "value": "67862ea941c99c2031416254"
                    }
                  ],
                  "combinator": "or",
                  "not": false
                }
              ],
              "combinator": "and",
              "not": false
            }
          ],
          "id": "a2bb6876-7799-44d1-a066-8a84a0a83fc2"
        },
        "list_validate": [
          {
            "_id": "6784f4dd8145c207b78a9972",
            "title": "is-tenant-public",
            "entity": {
              "_id": "6740251baefaffc3e4662e6b",
              "mongodb_collection_name": "tenant"
            },
            "path_file": "json/validate/6784f4dd8145c207b78a9972.json"
          },
          {
            "_id": "6784f56b4c9747dfaeed5ca6",
            "title": "is-tenant-private",
            "entity": {
              "_id": "6740251baefaffc3e4662e6b",
              "mongodb_collection_name": "tenant"
            },
            "path_file": "json/validate/6784f56b4c9747dfaeed5ca6.json"
          },
          {
            "_id": "678539794c9747dfaeed5f39",
            "title": "is-user-active",
            "entity": {
              "_id": "6749933810905d9ddbd0104b",
              "mongodb_collection_name": "user"
            },
            "path_file": "json/validate/678539794c9747dfaeed5f39.json"
          },
          {
            "_id": "67862ea941c99c2031416254",
            "title": "user-joined-course",
            "entity": {
              "_id": "67853fcd4c9747dfaeed5f84",
              "mongodb_collection_name": "mge-course-member"
            },
            "path_file": "json/validate/67862ea941c99c2031416254.json"
          },
          {
            "_id": "678635516d9b09071159c2d8",
            "title": "is-course-public",
            "entity": {
              "_id": "67529c0665017d942f7592d1",
              "mongodb_collection_name": "mge-courses"
            },
            "path_file": "json/validate/678635516d9b09071159c2d8.json"
          }
        ],
        "custom_filter": {
          "id": "0b3a47cb-7d0d-4b4d-9291-dd6b457c912c",
          "rules": [],
          "combinator": "and",
          "not": false
        }
      }
    ]
  },
  "get-detail": {
    "headers": [],
    "params": [
      {
        "value": "course_id",
        "key": "course_id"
      },
      {
        "value": "_id",
        "key": "_id"
      }
    ],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "6787255b5ca6233671cb0e5d",
          "title": "get detail lesson",
          "entity": "mge-lessons",
          "path_file": "json/response/6787255b5ca6233671cb0e5d.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "60f95497-ff4f-499c-ae24-7880ffa46946",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678539794c9747dfaeed5f39"
            },
            {
              "id": "8827e836-26c9-42e6-9232-d3cb97f1ee85",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "67862ea941c99c2031416254"
            }
          ],
          "id": "68ac92d4-3dc5-4e68-aba1-d9b64861572d"
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
          },
          {
            "_id": "67862ea941c99c2031416254",
            "title": "user-joined-course",
            "entity": {
              "_id": "67853fcd4c9747dfaeed5f84",
              "mongodb_collection_name": "mge-course-member"
            },
            "path_file": "json/validate/67862ea941c99c2031416254.json"
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
    "params": [
      {
        "value": "course_id",
        "key": "course_id"
      },
      {
        "value": "_id",
        "key": "_id"
      }
    ],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "67bd3f172692eef9b7ac3469",
          "title": "delete lesson",
          "entity": "mge-lessons",
          "path_file": "json/response/67bd3f172692eef9b7ac3469.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "00a02fbb-f34c-47e0-a853-4736cff2cfa4",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678539794c9747dfaeed5f39"
            },
            {
              "id": "535c7916-77aa-47d3-9d65-ee60d2063148",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "67862ea941c99c2031416254"
            },
            {
              "id": "edaa09b7-4d73-41aa-992b-b66a045fb963",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678681b36d9b09071159c4e9"
            }
          ],
          "id": "0786c21e-1668-4fc6-943e-ceee388cbd37"
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
          },
          {
            "_id": "67862ea941c99c2031416254",
            "title": "user-joined-course",
            "entity": {
              "_id": "67853fcd4c9747dfaeed5f84",
              "mongodb_collection_name": "mge-course-member"
            },
            "path_file": "json/validate/67862ea941c99c2031416254.json"
          },
          {
            "_id": "678681b36d9b09071159c4e9",
            "title": "is-user-has-permission-to-manage-lesson",
            "entity": {
              "_id": "67853fcd4c9747dfaeed5f84",
              "mongodb_collection_name": "mge-course-member"
            },
            "path_file": "json/validate/678681b36d9b09071159c4e9.json"
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