export const ISTWEETNEWSBELONGSTOPUBLICGROUP = {
  _id: "675bf2327676bb226a02cbe1",
  title: "is-tweet-news-belongs-to-public-group",
  entity: [
  "674e8ed585bc5241dd6405d3"
],
  data: {
  "id": "1fbb22f0-e695-45f0-a174-dff83990fd20",
  "rules": [],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"$expr":true}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  advance: `[
    {
        "$addFields": {
            "idAsString": { "$toString": "$_id" }
        }
    },
    {
        "$match": {
            "idAsString": {
              "$in": "@body:tweet_news"
            }
        }
    },
    {
        "$addFields": {
            "social_group_as_objectId": {
                "$map": {
                    "input": "$social_group",
                    "as": "sg",
                    "in": { "$toObjectId": "$$sg" }
                }
            }
        }
    },
    {
        "$lookup": {
            "from": "mge-group",
            "localField": "social_group_as_objectId",
            "foreignField": "_id",
            "as": "group_data",
            "pipeline": [
                {
                    "$match": {
                        "type": "public",
                        "status": "active"
                    }
                }
            ]
        }
    },
    {
        "$project": {
            "_id": 1,
            "title": 1,
            "slug": 1,
            "social_group": 1,
            "group_data": 1
        }
    }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IstweetnewsbelongstopublicgroupConfig = typeof ISTWEETNEWSBELONGSTOPUBLICGROUP;