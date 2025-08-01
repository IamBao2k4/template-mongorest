export const IS_TWEETAPPROVEMODEFALSE = {
  _id: "67627319d5f20b2905479ca0",
  title: "is tweet-approve-mode-false",
  entity: [
  "6747ef07c47463d88f8c5ab1"
],
  data: {
  "id": "a16d750e-eccf-4b9d-b583-07ac3ae921a3",
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
            "idAsString": "@param:group_id" }
        
    },
    {
        "$match": {
            "permissions.tweet_approve_mode": false
        }
    },
    {
        "$project": {
            "_id": 1,
            "name": 1,
            "slug": 1,
            "description": 1,
            "permissions": {
                "tweet_approve_mode": 1
            }
        }
    }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsTweetapprovemodefalseConfig = typeof IS_TWEETAPPROVEMODEFALSE;