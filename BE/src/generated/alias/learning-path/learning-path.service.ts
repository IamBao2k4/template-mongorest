import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class LearningPathService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "learning-path": {},
  "post": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "680632a4beb73c2d42c981d7",
          "title": "create learning path",
          "entity": "mge-learning-path",
          "path_file": "json/response/680632a4beb73c2d42c981d7.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "6c26c8a2-c182-4950-a7d0-6bae68973e9f",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6806340ebeb73c2d42c9836f"
            }
          ],
          "id": "1fd0dcf0-3147-49c0-aa92-e7d4bd47ee91"
        },
        "list_validate": [
          {
            "_id": "6806340ebeb73c2d42c9836f",
            "title": "is-user-can-create-learning-path",
            "entity": {
              "_id": "67aad740a67aaa1951ca64b0",
              "mongodb_collection_name": "user-tenant-profile"
            },
            "path_file": "json/validate/6806340ebeb73c2d42c9836f.json"
          }
        ],
        "custom_filter": {
          "rules": []
        },
        "trigger_pipeline": "[\n  {\n    \"collection_name\": \"mge-user-learning-path\",\n    \"action\": \"create-mapping\",\n    \"collection_name_query\": \"user-tenant-profile\",\n    \"query_advance\": [\n      {\n        \"$match\": {\n          \"tenant_id\": \"@header:x-tenant-id\",\n          \"$expr\": {\n            \"$and\": [\n              {\n                \"$or\": [\n                  {\n                    \"$eq\": [\"@main_result:department._id\", null]\n                  },\n                  {\n                    \"$eq\": [\"@main_result:department._id\", \"\"]\n                  },\n                  {\n                    \"$eq\": [\"$profile.course.department\", [\"@main_result:department._id\"]]\n                  },\n                  {\n                    \"$eq\": [\"@main_result:department._id\", []]\n                  }\n                ]\n              },\n              {\n                \"$or\": [\n                  {\n                    \"$eq\": [\"@main_result:team._id\", null]\n                  },\n                  {\n                    \"$eq\": [\"@main_result:team._id\", \"\"]\n                  },\n                  {\n                    \"$eq\": [\"$profile.course.team\", [\"@main_result:team._id\"]]\n                  },\n                  {\n                    \"$eq\": [\"@main_result:team._id\", []]\n                  }\n                ]\n              },\n              {\n                \"$or\": [\n                  {\n                    \"$eq\": [\"@main_result:job_position._id\", null]\n                  },\n                  {\n                    \"$eq\": [\"@main_result:job_position._id\", \"\"]\n                  },\n                  {\n                    \"$eq\": [\"$profile.course.job_position\", [\"@main_result:job_position._id\"]]\n                  },\n                  {\n                    \"$eq\": [\"@main_result:job_position._id\", []]\n                  }\n                ]\n              },\n                      {\n          \"$not\": {\n            \"$and\": [\n              { \"$eq\": [\"@main_result:department._id\", []] },\n              { \"$eq\": [\"@main_result:team._id\", []] },\n              { \"$eq\": [\"@main_result:job_position._id\", []] }\n            ]\n          }\n        }\n            ]\n          }\n        }\n      },\n      {\n        \"$project\": {\n          \"user\": 1,\n          \"_id\": 0,\n          \"learning_path\": [\"@main_result:_id\"],\n          \"status\": [\"not_learned\"],\n          \"tenant_id\": 1\n        }\n      }\n    ]\n  },\n  {\n    \"collection_name\": \"mge-course-tenant-log-record\",\n    \"action\": \"create-mapping\",\n    \"collection_name_query\": \"user-tenant-profile\",\n    \"query_advance\": [\n      {\n        \"$match\": {\n          \"tenant_id\": \"@header:x-tenant-id\",\n          \"$expr\": {\n            \"$and\": [\n              {\n                \"$or\": [\n                  {\n                    \"$eq\": [\"@main_result:department._id\", null]\n                  },\n                  {\n                    \"$eq\": [\"@main_result:department._id\", \"\"]\n                  },\n                  {\n                    \"$eq\": [\"$profile.course.department\", [\"@main_result:department._id\"]]\n                  },\n                  {\n                    \"$eq\": [\"@main_result:department._id\", []]\n                  }\n                ]\n              },\n              {\n                \"$or\": [\n                  {\n                    \"$eq\": [\"@main_result:team._id\", null]\n                  },\n                  {\n                    \"$eq\": [\"@main_result:team._id\", \"\"]\n                  },\n                  {\n                    \"$eq\": [\"$profile.course.team\", [\"@main_result:team._id\"]]\n                  },\n                  {\n                    \"$eq\": [\"@main_result:team._id\", []]\n                  }\n                ]\n              },\n              {\n                \"$or\": [\n                  {\n                    \"$eq\": [\"@main_result:job_position._id\", null]\n                  },\n                  {\n                    \"$eq\": [\"@main_result:job_position._id\", \"\"]\n                  },\n                  {\n                    \"$eq\": [\"$profile.course.job_position\", [\"@main_result:job_position._id\"]]\n                  },\n                  {\n                    \"$eq\": [\"@main_result:job_position._id\", []]\n                  }\n                ]\n              }\n            ]\n          }\n        }\n      },\n      {\n        \"$addFields\": {\n          \"full_name\": {\n            \"$concat\": [\n              {\n                \"$ifNull\": [\"$profile.last_name\", \"\"]\n              },\n              \" \",\n              {\n                \"$ifNull\": [\"$profile.first_name\", \"\"]\n              }\n            ]\n          }\n        }\n      },\n      {\n        \"$project\": {\n          \"title\": \"@user_full_name đã được thêm vào lộ trình @learning_path_title\",\n          \"type\": \"course_learning_path_by_user\",\n          \"tenant_id\": 1,\n          \"_id\": 0,\n          \"from\": \"$user\",\n          \"value_replace\": [\n            {\n              \"title\": \"user_full_name\",\n              \"value\": \"$full_name\",\n              \"entity_type\": \"user-tenant-profile\",\n              \"entity_id\": {\n                \"$cond\": {\n                  \"if\": { \"$isArray\": \"$user\" },\n                  \"then\": { \"$toString\": { \"$arrayElemAt\": [\"$user\", 0] } },\n                  \"else\": { \"$toString\": \"$user\" }\n                }\n              }\n            },\n            {\n              \"title\": \"learning_path_title\",\n              \"value\": \"@main_result:title\",\n              \"entity_type\": \"mge-learning-path\",\n              \"entity_id\": \"@main_result:_id\"\n            }\n          ]\n        }\n      }\n    ]\n  },\n  {\n    \"collection_name\": \"user-tenant-profile\",\n    \"action\": \"find-one\",\n    \"query_advance\": [\n      {\n        \"$addFields\": {\n          \"_id\": {\n            \"$toString\": \"$_id\"\n          }\n        }\n      },\n      {\n        \"$match\": {\n          \"tenant_id\": \"@header:x-tenant-id\",\n          \"user\": \"@jwt:user.id\"\n        }\n      },\n      {\n        \"$addFields\": {\n          \"full_name\": {\n            \"$concat\": [\n              {\n                \"$ifNull\": [\"$profile.last_name\", \"\"]\n              },\n              \" \",\n              {\n                \"$ifNull\": [\"$profile.first_name\", \"\"]\n              }\n            ]\n          }\n        }\n      }\n    ]\n  },\n  {\n    \"collection_name\": \"mge-course-tenant-log-record\",\n    \"action\": \"create\",\n    \"advance\": {\n      \"title\": \"@user_full_name đã tạo lộ trình khóa học @learning_path_title\",\n      \"type\": \"course_learning_path\",\n      \"from\": \"@jwt:user.id\",\n      \"value_replace\": [\n        {\n          \"title\": \"user_full_name\",\n          \"value\": \"@pipeline_result[2]:full_name\",\n          \"entity_type\": \"user-tenant-profile\",\n          \"entity_id\": \"@jwt:user.id\"\n        },\n        {\n          \"title\": \"learning_path_title\",\n          \"value\": \"@main_result:title\",\n          \"entity_type\": \"mge-learning-path\",\n          \"entity_id\": \"@main_result:_id\"\n        }\n      ]\n    }\n  }\n]\n"
      }
    ]
  },
  "get-list": {
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
          "_id": "68185ea2753574930d60f829",
          "title": "get list learning path",
          "entity": "mge-learning-path",
          "path_file": "json/response/68185ea2753574930d60f829.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "88ad6a85-0bdd-4470-8bdb-0482c084b20e",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678539794c9747dfaeed5f39"
            }
          ],
          "id": "1754dc53-6d83-47d9-8803-6d1e70d3c79d"
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
  },
  "get-detail": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "68077a74fa0fd1ce8598958b",
          "title": "get detail learning path",
          "entity": "mge-learning-path",
          "path_file": "json/response/68077a74fa0fd1ce8598958b.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "c1406999-25ac-41f7-9b6f-c271caee2ee3",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678539794c9747dfaeed5f39"
            }
          ],
          "id": "6955ffe8-2323-4172-a6d9-cb2b10624bf7"
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
  },
  "delete": {
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
          "_id": "680afea3ea7aac56e895036c",
          "title": "delete learning path",
          "entity": "mge-learning-path",
          "path_file": "json/response/680afea3ea7aac56e895036c.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "18acda36-8526-4fe5-8f00-519cc98a2e9c",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "67bd41262692eef9b7ac3b96"
            }
          ],
          "id": "1e253bcc-334f-4b99-9774-8d73d3a87da0"
        },
        "list_validate": [
          {
            "_id": "67bd41262692eef9b7ac3b96",
            "title": "is-user-super-admin",
            "entity": {
              "_id": "6757b1998659c9e98a2f1e2b",
              "mongodb_collection_name": "user-tenant-level-mapping"
            },
            "path_file": "json/validate/67bd41262692eef9b7ac3b96.json"
          }
        ],
        "custom_filter": {
          "rules": []
        },
        "trigger_pipeline": "[\n  {\n    \"collection_name\": \"mge-user-learning-path\",\n    \"action\": \"delete\",\n    \"query_advance\": [\n      {\n        \"$match\": {\n          \"tenant_id\": \"@header:x-tenant-id\",\n          \"learning_path\": \"@param:_id\"\n        }\n      }\n    ]\n  },\n  {\n    \"collection_name\": \"mge-course-tenant-log-record\",\n    \"action\": \"delete\",\n    \"query_advance\": [\n      {\n        \"$match\": {\n          \"tenant_id\": \"@header:x-tenant-id\",\n          \"type\": \"course_learning_path_by_user\",\n          \"value_replace.entity_id\":\"@param:_id\"\n        }\n      }\n    ]\n  },\n  {\n    \"collection_name\": \"mge-course-tenant-log-record\",\n    \"action\": \"delete\",\n    \"query_advance\": [\n      {\n        \"$match\": {\n          \"tenant_id\": \"@header:x-tenant-id\",\n          \"type\": \"course_learning_path\",\n          \"value_replace.entity_id\": \"@param:_id\"\n        }\n      }\n    ]\n  }\n]"
      }
    ]
  },
  "put": {
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
          "_id": "6854fb22ced3311bbefc6cd6",
          "title": "update learning path",
          "entity": "mge-learning-path",
          "path_file": "json/response/6854fb22ced3311bbefc6cd6.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "15734efd-6d90-459a-b53f-936e57a46f93",
              "field": "data",
              "operator": "",
              "valueSource": "value",
              "value": "6806340ebeb73c2d42c9836f"
            }
          ],
          "id": "ceef520f-e502-4291-a948-e761c21d68ef"
        },
        "list_validate": [
          {
            "_id": "6806340ebeb73c2d42c9836f",
            "title": "is-user-can-create-learning-path",
            "entity": {
              "_id": "6740251baefaffc3e4662e6b",
              "mongodb_collection_name": "tenant"
            },
            "path_file": "json/validate/6806340ebeb73c2d42c9836f.json"
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