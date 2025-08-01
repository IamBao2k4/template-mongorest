export const ISTWEETBELONGTOTENANTPRIVATE = {
  _id: "67692ed051505605e15f7fa3",
  title: "is-tweet-belong-to-tenant-private",
  entity: [
  "6747ef07c47463d88f8c5ab1"
],
  data: {
  "id": "264d3acd-cb23-491d-beff-a7eadeeab840",
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
    "$match": {
      "slug": "@param:slug"
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
            "type": "private"
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

export type IstweetbelongtotenantprivateConfig = typeof ISTWEETBELONGTOTENANTPRIVATE;