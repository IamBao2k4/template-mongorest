export const ISTWEETBELONGSTOWATCHLATERCOLLECTION = {
  _id: "67e65e2f14e91c0de8f8cff8",
  title: "is-tweet-belongs-to-watch-later-collection",
  entity: [
  "675b9a4a9279b9d81247c3cc"
],
  data: {
  "id": "21f5c078-8107-480a-b5e6-d69ba9bd6b48",
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
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "_id": "@param:_id",
      "created_by":"@jwt:user.id",
      "$or": [
        {
          "user_collection": {
            "$exists": false
          }
        },
        {
          "user_collection": null
        }
      ]
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: [
  {
    "value": "_id",
    "key": "_id"
  }
],
} as const;

export type IstweetbelongstowatchlatercollectionConfig = typeof ISTWEETBELONGSTOWATCHLATERCOLLECTION;