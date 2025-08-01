export const ISTYPEGROUPPRIVATE = {
  _id: "675fe9205a1356463269cd4a",
  title: "is-type-group-private",
  note: "Check type group có phải là private không thông qua slug hoặc id của tweet",
  entity: [],
  data: {},
  required: [],
  queryMongodb: `{}`,
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
            "type": "social-images"
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
            "type": "social-videos"
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
            "type": "social-news"
          }
        }
      ]
    }
  },
  {
    "$addFields": {
      "id": { "$toString": "$_id" }
    }
  },
  {
    "$match": {
      "$or": [
        {
          "id": "@param:id"
        },
        {
          "slug": "@param:slug"
        }
      ]
    }
  },
  {
    "$unwind": {
      "path": "$social_group"
    }
  },
  {
    "$addFields": {
      "groupId_Object": {
        "$toObjectId": "$social_group"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-group",
      "localField": "groupId_Object",
      "foreignField": "_id",
      "as": "social_group"
    }
  },
  {
    "$match": {
      "social_group.type": "private",
      "social_group.status": "active"
    }
  }
]
`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IstypegroupprivateConfig = typeof ISTYPEGROUPPRIVATE;