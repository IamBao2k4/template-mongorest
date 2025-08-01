export const ISGROUP_ACTIVE_AND_USERJOINED = {
  _id: "675bee1c7676bb226a02c65e",
  title: "is-group active AND user-joined",
  note: "Kiểm tra xem tweet có thuộc group có active không, user đã join group chưa",
  entity: [
  "67b6a286606da18e6c1976f1"
],
  data: {
  "id": "8f89a5b2-f8bf-4a8f-ab12-4075f7040e97",
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
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$match": {
      "$or": [
        {
          "id": "@body:_id"
        },
        {
          "id": "@param:_id"
        },
        {
          "id": "@param:tweet_id"
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
      "social_group_objectId": {
        "$toObjectId": "$social_group"
      }
    }
  },
  {
    "$facet": {
      "check_status_group": [
        {
          "$lookup": {
            "from": "mge-group",
            "localField": "social_group_objectId",
            "foreignField": "_id",
            "pipeline": [
              {
                "$match": {
                  "status": "active"
                }
              }
            ],
            "as": "group_info"
          }
        },
        {
          "$match": {
            "group_info": {
              "$ne": []
            }
          }
        }
      ],
      "check_user_joined": [
        {
          "$lookup": {
            "from": "mge-group-member",
            "localField": "social_group",
            "foreignField": "social_group",
            "pipeline": [
              {
                "$match": {
                  "status": "joined",
                  "user": "@jwt:user.id"
                }
              }
            ],
            "as": "group_member_info"
          }
        },
        {
          "$match": {
            "group_member_info": {
              "$ne": []
            }
          }
        }
      ]
    }
  },
  {
    "$match": {
      "$and": [
        {
          "check_status_group": {
            "$ne": []
          }
        },
        {
          "check_user_joined": {
            "$ne": []
          }
        }
      ]
    }
  }
]`,
  documents: [],
  body: [
  {
    "value": "_id",
    "key": "_id"
  },
  {
    "value": "tweet_id",
    "key": "tweet_id"
  }
],
  categories: [],
  headers: [
  {
    "value": "user.id",
    "key": "user.id"
  },
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  params: [
  {
    "value": "tweet_id",
    "key": "tweet_id"
  },
  {
    "value": "_id",
    "key": "_id"
  },
  {
    "value": "slug",
    "key": "slug"
  }
],
} as const;

export type IsgroupActiveANDUserjoinedConfig = typeof ISGROUP_ACTIVE_AND_USERJOINED;