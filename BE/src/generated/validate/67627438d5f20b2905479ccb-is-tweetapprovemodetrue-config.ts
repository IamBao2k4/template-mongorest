export const IS_TWEETAPPROVEMODETRUE = {
  _id: "67627438d5f20b2905479ccb",
  title: "is tweet-approve-mode-true",
  entity: [
  "6747ef07c47463d88f8c5ab1"
],
  data: {
  "id": "b3a2678e-36ee-4398-a055-1654de5e9cc4",
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
            "permissions.tweet_approve_mode": true
        }
    }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsTweetapprovemodetrueConfig = typeof IS_TWEETAPPROVEMODETRUE;