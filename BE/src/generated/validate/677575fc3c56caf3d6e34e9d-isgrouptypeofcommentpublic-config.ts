export const ISGROUPTYPEOFCOMMENTPUBLIC = {
  _id: "677575fc3c56caf3d6e34e9d",
  title: "is-group-type-of-comment-public",
  entity: [
  "6764e3926e57acaf6815ab97"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
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
      "_id": "@param:comment_id"
    }
  },
  {
    "$addFields": {
      "groupObject": {
        "$map": {
          "input": "$social_group",
          "as": "u",
          "in": {
            "$toObjectId": "$$u"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-group",
      "localField": "groupObject",
      "foreignField": "_id",
      "pipeline": [
        {
          "$match": {
            "type": "public"
          }
        }
      ],
      "as": "is_public"
    }
  },
  {
    "$match": {
      "is_public": { "$ne": [] }
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsgrouptypeofcommentpublicConfig = typeof ISGROUPTYPEOFCOMMENTPUBLIC;