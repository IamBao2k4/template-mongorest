export const ISTWEETBELONGTOTENANTPUBLIC = {
  _id: "67692d2551505605e15f7f37",
  title: "is-tweet-belong-to-tenant-public",
  entity: [
  "6747ef07c47463d88f8c5ab1"
],
  data: {
  "id": "f3740336-23a7-4d8c-a6b0-c66687c721d3",
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
    "$match": {
      "_id": { "$exists": false }
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-image",
      "pipeline": [
        {
          "$addFields": {
            "type": "images"
          }
        }
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-videos",
      "pipeline": [
        {
          "$addFields": {
            "type": "videos"
          }
        }
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-news",
      "pipeline": [
        {
          "$addFields": {
            "type": "news"
          }
        }
      ]
    }
  },
    {
    "$unionWith": {
      "coll": "mge-tweet-social-votes",
      "pipeline": [
        {
          "$addFields": {
            "type": "votes"
          }
        }
      ]
    }
  },
  {
    "$addFields": {
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "$or": [
        {"slug": "@param:slug"},
        {"id": "@param:_id"}
        ]
    }
  },
  {
    "$addFields": {
      "tenant_id_as_objectId": { "$toObjectId": "$tenant_id" }
    }
  },
  {
    "$lookup": {
      "from": "tenant",
      "localField": "tenant_id_as_objectId",
      "foreignField": "_id",
      "as": "tenant_info",
      "pipeline": [
        {
          "$match": {
            "type": "public"
          }
        }
      ]
    }
  },
  {
    "$unwind": {
      "path": "$tenant_info",
      "preserveNullAndEmptyArrays": false
    }
  },
  {
    "$addFields": {
      "tenant_info.tenantID": { "$toString": "$tenant_info._id" }
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: [
  {
    "value": "slug",
    "key": "slug"
  }
],
} as const;

export type IstweetbelongtotenantpublicConfig = typeof ISTWEETBELONGTOTENANTPUBLIC;