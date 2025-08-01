import { FastifyRequest } from 'fastify';
import { QueryProcessor, createQueryProcessor } from '../utils/queryProcessor';
import { executeQueryInstance } from '../utils/executeQuery';

export class LikeService {
  protected config: any;
  protected queryProcessor: QueryProcessor;
  protected InstanceQuery = executeQueryInstance;

  constructor() {
    this.config = {
  "like": {},
  "post": {
    "headers": [
      {
        "value": "x-tenant-id",
        "key": "x-tenant-id"
      },
      {
        "value": "user.id",
        "key": "user.id"
      }
    ],
    "params": [
      {
        "value": "tweet_id",
        "key": "tweet_id"
      },
      {
        "value": "slug",
        "key": "slug"
      },
      {
        "value": "_id",
        "key": "_id"
      },
      {
        "value": "entity_id",
        "key": "entity_id"
      }
    ],
    "body": [
      {
        "value": "tweet_id",
        "key": "tweet_id"
      },
      {
        "value": "_id",
        "key": "_id"
      }
    ],
    "validate": [
      {
        "notification": {
          "_id": "67ee602cb086ec27910e798a",
          "path_file": "json/notification/67ee602cb086ec27910e798a.json"
        },
        "response": {
          "_id": "676b6ca4357685825bbd0a70",
          "title": "User like tweet",
          "entity": "mge-entity-like",
          "path_file": "json/response/676b6ca4357685825bbd0a70.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "664d0de7-c105-49d9-95e6-605b919a5392",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            },
            {
              "id": "160a10ef-d173-4a6a-8019-ff874246f8c8",
              "rules": [
                {
                  "id": "305261d4-ae1e-4ee7-8925-aeb26a4e65d7",
                  "field": "data",
                  "operator": "=",
                  "valueSource": "value",
                  "value": "675fe82c5a1356463269cc40"
                },
                {
                  "id": "baa52338-e94b-4f8d-91fe-4006a8e029a9",
                  "field": "data",
                  "operator": "=",
                  "valueSource": "value",
                  "value": "675bee1c7676bb226a02c65e"
                }
              ],
              "combinator": "or",
              "not": false
            },
            {
              "id": "ad81da92-1f49-41f8-a2c8-f5bc1db087aa",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6773c0d9ab2649a80d75bd79"
            }
          ],
          "id": "261955a8-2abc-4bde-a18e-ca371610ad69"
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
            "_id": "675bee1c7676bb226a02c65e",
            "title": "is-group active AND user-joined",
            "entity": {
              "_id": "6747ef07c47463d88f8c5ab1",
              "mongodb_collection_name": "mge-group"
            },
            "path_file": "json/validate/675bee1c7676bb226a02c65e.json"
          },
          {
            "_id": "675fe82c5a1356463269cc40",
            "title": "is-type-group-public",
            "entity": {
              "_id": "67b6a286606da18e6c1976f1",
              "mongodb_collection_name": "mge-tweet"
            },
            "path_file": "json/validate/675fe82c5a1356463269cc40.json"
          },
          {
            "_id": "6773c0d9ab2649a80d75bd79",
            "title": "is-tweet-has-like-off-is-false",
            "entity": {
              "_id": "67b6a286606da18e6c1976f1",
              "mongodb_collection_name": "mge-tweet"
            },
            "path_file": "json/validate/6773c0d9ab2649a80d75bd79.json"
          }
        ],
        "custom_filter": {
          "id": "88978e95-4408-44af-87ec-209a46bdc942",
          "rules": [
            {
              "id": "abd6d1fd-b851-44f9-b80f-b80f5326bbff",
              "field": 0,
              "operator": "=",
              "valueSource": "value",
              "value": "tweet"
            }
          ],
          "combinator": "and",
          "not": false
        },
        "trigger_pipeline": ""
      },
      {
        "notification": {
          "_id": "67ee62f2b086ec27910e7b47",
          "path_file": "json/notification/67ee62f2b086ec27910e7b47.json"
        },
        "response": {
          "_id": "677578253c56caf3d6e34eb0",
          "title": "user like comment",
          "entity": "mge-entity-like",
          "path_file": "json/response/677578253c56caf3d6e34eb0.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "4a555eb3-6d19-41a2-9b77-ce37a09a3253",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "675a8e9b0f44fc1769fdea90"
            },
            {
              "id": "9eefe172-589c-4a95-873e-25570f80c564",
              "rules": [
                {
                  "id": "2b192c90-c5d3-45c2-9528-0f99daf62fe0",
                  "field": "data",
                  "operator": "=",
                  "valueSource": "value",
                  "value": "677575fc3c56caf3d6e34e9d"
                },
                {
                  "id": "8c40458d-d7b9-4778-888b-739ed0a8359b",
                  "field": "data",
                  "operator": "=",
                  "valueSource": "value",
                  "value": "677577c53c56caf3d6e34ea6"
                }
              ],
              "combinator": "or",
              "not": false
            },
            {
              "id": "7663dfcc-f03f-4968-ba50-3ef99a195941",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6773c0d9ab2649a80d75bd79"
            }
          ],
          "id": "eae37c4e-9567-46c7-8bea-5ca0d5190803"
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
            "_id": "677575fc3c56caf3d6e34e9d",
            "title": "is-group-type-of-comment-public",
            "entity": {
              "_id": "6764e3926e57acaf6815ab97",
              "mongodb_collection_name": "mge-tweet-comment"
            },
            "path_file": "json/validate/677575fc3c56caf3d6e34e9d.json"
          },
          {
            "_id": "677577c53c56caf3d6e34ea6",
            "title": "was-user-joined-group-of-comment",
            "entity": {
              "_id": "6764e3926e57acaf6815ab97",
              "mongodb_collection_name": "mge-tweet-comment"
            },
            "path_file": "json/validate/677577c53c56caf3d6e34ea6.json"
          },
          {
            "_id": "6773c0d9ab2649a80d75bd79",
            "title": "is-tweet-has-like-off-is-false",
            "entity": {
              "_id": "67b6a286606da18e6c1976f1",
              "mongodb_collection_name": "mge-tweet"
            },
            "path_file": "json/validate/6773c0d9ab2649a80d75bd79.json"
          }
        ],
        "custom_filter": {
          "id": "4793223c-44b4-4983-96dc-9e6ff6d76c57",
          "rules": [
            {
              "id": "fa4999f8-ef35-4f68-bc06-78aa34916a86",
              "field": 0,
              "operator": "=",
              "valueSource": "value",
              "value": "comment"
            }
          ],
          "combinator": "and",
          "not": false
        },
        "trigger_pipeline": "[\n  {\n    \"collection_name\": \"mge-tweet-comment\",\n    \"action\": \"update\",\n    \"query_advance\": [\n      {\n        \"$addFields\": {\n          \"id\": {\n            \"$toString\": \"$_id\"\n          }\n        }\n      },\n      {\n        \"$match\": {\n          \"tenant_id\": \"@header:x-tenant-id\",\n          \"id\": \"@param:comment_id\"\n        }\n      }\n    ],\n    \"advance\": {\n      \"$inc\": {\n        \"like_count\": 1\n      }\n    }\n  },\n  {\n    \"collection_name\": \"mge-tweet-comment\",\n    \"action\": \"find-one\",\n    \"query_advance\": [\n      {\n        \"$addFields\": {\n          \"_id\": {\n            \"$toString\": \"$_id\"\n          }\n        }\n      },\n      {\n        \"$match\": {\n          \"_id\": \"@main_result:entity_id\"\n        }\n      },\n      {\n        \"$lookup\": {\n          \"from\": \"user-tenant-profile\",\n          \"localField\": \"created_by\",\n          \"foreignField\": \"user\",\n          \"pipeline\": [\n            {\n              \"$match\": {\n                \"tenant_id\": \"@header:x-tenant-id\"\n              }\n            },\n            {\n              \"$addFields\": {\n                \"full_name\": {\n                  \"$concat\": [\"$profile.social.last_name\", \" \", \"$profile.social.first_name\"]\n                }\n              }\n            },\n            {\n              \"$project\": {\n                \"_id\": \"$user\",\n                \"full_name\": 1\n              }\n            }\n          ],\n          \"as\": \"user\"\n        }\n      },\n      {\n        \"$addFields\": {\n          \"social_group\": {\n            \"$map\": {\n              \"input\": \"$social_group\",\n              \"as\": \"sg\",\n              \"in\": {\n                \"$toObjectId\": \"$$sg\"\n              }\n            }\n          }\n        }\n      },\n      {\n        \"$lookup\": {\n          \"from\": \"mge-group\",\n          \"localField\": \"social_group\",\n          \"foreignField\": \"_id\",\n          \"as\": \"social_group\"\n        }\n      }\n    ]\n  },\n  {\n    \"collection_name\": \"mge-social-activity-log-record\",\n    \"action\": \"create\",\n    \"advance\": {\n      \"title\": \"Bạn đã thích bình luận của $user_full_name trong nhóm $social_group_title\",\n      \"value_replace\": [\n        {\n          \"title\": \"user_full_name\",\n          \"value\": \"@pipeline_result[1]:user.full_name\"\n        },\n        {\n          \"title\": \"social_group_title\",\n          \"value\": \"@pipeline_result[1]:social_group.title\"\n        }\n      ],\n      \"parent_type\": \"tweet_engagement\",\n      \"type\": \"COMMENT_LIKED\",\n      \"from\": [\"@jwt:user.id\"]\n    }\n  }\n]\n"
      }
    ]
  },
  "delete": {
    "headers": [
      {
        "value": "x-tenant-id",
        "key": "x-tenant-id"
      },
      {
        "value": "user.id",
        "key": "user.id"
      }
    ],
    "params": [
      {
        "value": "_id",
        "key": "_id"
      },
      {
        "value": "tweet_id",
        "key": "tweet_id"
      },
      {
        "value": "slug",
        "key": "slug"
      }
    ],
    "body": [
      {
        "value": "tweet_id",
        "key": "tweet_id"
      },
      {
        "value": "_id",
        "key": "_id"
      }
    ],
    "validate": [
      {
        "notification": {},
        "response": {
          "_id": "6773bd62ab2649a80d75bced",
          "title": "unlike",
          "entity": "mge-entity-like",
          "path_file": "json/response/6773bd62ab2649a80d75bced.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "f0fb4a50-ea73-44fa-9e93-27570fb09ba7",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "67e5193fe7deb4b67718d5af"
            },
            {
              "id": "20e21604-e07f-455b-83a4-8bcf3be6e77d",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6773c0d9ab2649a80d75bd79"
            },
            {
              "id": "8f39f563-af49-4b7f-91aa-88a96fd84d47",
              "rules": [
                {
                  "id": "8d30f0f5-972f-4c0c-a122-67ca9abd2b84",
                  "field": "data",
                  "operator": "=",
                  "valueSource": "value",
                  "value": "675fe82c5a1356463269cc40"
                },
                {
                  "id": "f3e09215-c85c-4165-9a63-a65c3f600eae",
                  "field": "data",
                  "operator": "=",
                  "valueSource": "value",
                  "value": "675bee1c7676bb226a02c65e"
                }
              ],
              "combinator": "or",
              "not": false
            }
          ],
          "id": "b68c4b09-b45b-4659-974c-da6c8c6ba05f"
        },
        "list_validate": [
          {
            "_id": "6773c0d9ab2649a80d75bd79",
            "title": "is-tweet-has-like-off-is-false",
            "entity": {
              "_id": "6747ef07c47463d88f8c5ab1",
              "mongodb_collection_name": "mge-group"
            },
            "path_file": "json/validate/6773c0d9ab2649a80d75bd79.json"
          },
          {
            "_id": "67e5193fe7deb4b67718d5af",
            "title": "is-like-creator",
            "entity": {
              "_id": "676a2762dedfcf1bf1c55abf",
              "mongodb_collection_name": "mge-entity-like"
            },
            "path_file": "json/validate/67e5193fe7deb4b67718d5af.json"
          },
          {
            "_id": "675fe82c5a1356463269cc40",
            "title": "is-type-group-public",
            "entity": {
              "_id": "67b6a286606da18e6c1976f1",
              "mongodb_collection_name": "mge-tweet"
            },
            "path_file": "json/validate/675fe82c5a1356463269cc40.json"
          },
          {
            "_id": "675bee1c7676bb226a02c65e",
            "title": "is-group active AND user-joined",
            "entity": {
              "_id": "67b6a286606da18e6c1976f1",
              "mongodb_collection_name": "mge-tweet"
            },
            "path_file": "json/validate/675bee1c7676bb226a02c65e.json"
          }
        ],
        "custom_filter": {
          "rules": []
        },
        "trigger_pipeline": "[\r\n  {\r\n    \"collection_name\": \"mge-tweet\",\r\n    \"action\": \"update\",\r\n    \"query_advance\": [\r\n      {\r\n        \"$addFields\": {\r\n          \"id\": {\r\n            \"$toString\": \"$_id\"\r\n          }\r\n        }\r\n      },\r\n      {\r\n        \"$match\": {\r\n          \"tenant_id\": \"@header:x-tenant-id\",\r\n          \"id\": \"@param:tweet_id\"\r\n        }\r\n      }\r\n    ],\r\n    \"advance\": {\r\n      \"$inc\": {\r\n        \"like_count\": -1\r\n      }\r\n    }\r\n  }\r\n]"
      },
      {
        "notification": {},
        "response": {
          "_id": "6773bd62ab2649a80d75bced",
          "title": "unlike",
          "entity": "mge-entity-like",
          "path_file": "json/response/6773bd62ab2649a80d75bced.json"
        },
        "query_validate": {
          "combinator": "and",
          "rules": [
            {
              "id": "b71ce198-27fa-4446-be55-9137d6eebe75",
              "field": "data",
              "operator": "=",
              "valueSource": "value",
              "value": "6788db6239f8979659cafc94"
            },
            {
              "id": "6a0a2e63-03a6-44af-a9b1-e6666be87bb1",
              "rules": [
                {
                  "id": "a31a6afc-da85-47dd-bfae-e2738b79748c",
                  "field": "data",
                  "operator": "=",
                  "valueSource": "value",
                  "value": "6788cc8039f8979659cafa60"
                },
                {
                  "id": "fb504ee4-b6e1-4f15-98f8-22e9c2169419",
                  "field": "data",
                  "operator": "=",
                  "valueSource": "value",
                  "value": "6788d4ba39f8979659cafbd2"
                }
              ],
              "combinator": "or",
              "not": false
            }
          ],
          "id": "cffc31ef-0331-490a-87e9-939ebcdf2d1f"
        },
        "list_validate": [
          {
            "_id": "6788db6239f8979659cafc94",
            "title": "is-comment-mine (entity-like)",
            "entity": {
              "_id": "6764e3926e57acaf6815ab97",
              "mongodb_collection_name": "mge-tweet-comment"
            },
            "path_file": "json/validate/6788db6239f8979659cafc94.json"
          },
          {
            "_id": "6788d4ba39f8979659cafbd2",
            "title": "was-user-joined-group-of-comment (entity-like)",
            "entity": {
              "_id": "6764e3926e57acaf6815ab97",
              "mongodb_collection_name": "mge-tweet-comment"
            },
            "path_file": "json/validate/6788d4ba39f8979659cafbd2.json"
          },
          {
            "_id": "6788cc8039f8979659cafa60",
            "title": "is-type-group-public-through-comment",
            "entity": {
              "_id": "6764e3926e57acaf6815ab97",
              "mongodb_collection_name": "mge-tweet-comment"
            },
            "path_file": "json/validate/6788cc8039f8979659cafa60.json"
          }
        ],
        "custom_filter": {
          "rules": []
        },
        "trigger_pipeline": "[\n  {\n    \"collection_name\": \"mge-tweet-comment\",\n    \"action\": \"update\",\n    \"query_advance\": [\n      {\n        \"$addFields\": {\n          \"id\": {\n            \"$toString\": \"$_id\"\n          }\n        }\n      },\n      {\n        \"$match\": {\n          \"tenant_id\": \"@header:x-tenant-id\",\n          \"id\": \"@param:comment_id\"\n        }\n      }\n    ],\n    \"advance\": {\n      \"$inc\": {\n        \"like_count\": -1\n      }\n    }\n  }\n]\n"
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