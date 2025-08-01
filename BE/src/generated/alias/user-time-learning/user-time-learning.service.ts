import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class UserTimeLearningService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "user-time-learning": {},
  "put": {
    "headers": [],
    "params": [],
    "body": [],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "6833e0668151a797cf8b8a5f",
          "title": "update user end learning time",
          "entity": "mge-course-member",
          "path_file": "json/response/6833e0668151a797cf8b8a5f.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "f07a8aaa-a12b-4bf7-a378-87001559065b",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678539794c9747dfaeed5f39"
            },
            {
              "id": "e146cbe2-2417-4512-9ef0-ec1868e2c9a6",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6833e17e8151a797cf8b8acc"
            }
          ],
          "id": "744f93f3-6e01-43ee-b7fe-cfdff08da6c9"
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
          },
          {
            "_id": "6833e17e8151a797cf8b8acc",
            "title": "is-start-learning-time-exist",
            "entity": {
              "_id": "67853fcd4c9747dfaeed5f84",
              "mongodb_collection_name": "mge-course-member"
            },
            "path_file": "json/validate/6833e17e8151a797cf8b8acc.json"
          }
        ],
        "custom_filter": {
          "rules": []
        },
        "trigger_pipeline": "[\n  {\n    \"collection_name\": \"user-tenant-profile\",\n    \"action\": \"find-one\",\n    \"query_advance\": [\n      {\n        \"$addFields\": {\n          \"_id\": {\n            \"$toString\": \"$_id\"\n          }\n        }\n      },\n      {\n        \"$match\": {\n          \"tenant_id\": \"@header:x-tenant-id\",\n          \"user\": \"@main_result:user._id\"\n        }\n      },\n      {\n        \"$addFields\": {\n          \"full_name\": {\n            \"$concat\": [\n              {\n                \"$ifNull\": [\"$profile.last_name\", \"\"]\n              },\n              \" \",\n              {\n                \"$ifNull\": [\"$profile.first_name\", \"\"]\n              }\n            ]\n          }\n        }\n      }\n    ]\n  },\n  {\n    \"collection_name\": \"mge-course-log-record\",\n    \"action\": \"create\",\n    \"advance\": {\n      \"title\": \"@user_full_name đã hoàn thành khóa học @course_title\",\n      \"type\": \"course_completed\",\n      \"from\": \"@jwt:user.id\",\n      \"value_replace\": [\n        {\n          \"title\": \"user_full_name\",\n          \"value\": \"@pipeline_result[0]:full_name\",\n          \"entity_type\": \"user-tenant-profile\",\n          \"entity_id\": \"@main_result:user._id\"\n        },\n        {\n          \"title\": \"course_title\",\n          \"value\": \"@main_result:course.title\",\n          \"entity_type\": \"mge-courses\",\n          \"entity_id\": \"@main_result:course._id\"\n        }\n      ],\n      \"course\": \"@param:course_id\"\n    }\n  }\n]\n"
      },
      {
        "notification": {},
        "response": {
          "_id": "682567d512fd12f5b8f9a022",
          "title": "update user start learning time",
          "entity": "mge-course-member",
          "path_file": "json/response/682567d512fd12f5b8f9a022.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "f07a8aaa-a12b-4bf7-a378-87001559065b",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "678539794c9747dfaeed5f39"
            },
            {
              "id": "6ac8b333-b8ac-4c72-ae91-0741be90cdea",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6833e43a8151a797cf8b8bc7"
            }
          ],
          "id": "744f93f3-6e01-43ee-b7fe-cfdff08da6c9"
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
          },
          {
            "_id": "6833e43a8151a797cf8b8bc7",
            "title": "is-start-learning-time-not-exist",
            "entity": {
              "_id": "67853fcd4c9747dfaeed5f84",
              "mongodb_collection_name": "mge-course-member"
            },
            "path_file": "json/validate/6833e43a8151a797cf8b8bc7.json"
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