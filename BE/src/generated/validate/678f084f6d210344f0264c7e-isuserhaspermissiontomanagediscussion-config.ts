export const ISUSERHASPERMISSIONTOMANAGEDISCUSSION = {
  _id: "678f084f6d210344f0264c7e",
  title: "is-user-has-permission-to-manage-discussion",
  entity: [
  "67853fcd4c9747dfaeed5f84"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "677f6b3da3131eb0d3f9906d",
  advance: `[
    {
    "$match": {
      "user": "@jwt:user.id",
      "course": "@params:course_id"
    }
  },
    {
    "$addFields": {
      "course": {
        "$map": {
          "input": "$course",
          "as": "sg",
          "in": {
            "$toObjectId": "$$sg"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-courses",
      "localField": "course",
      "foreignField": "_id",
      "as": "group_info"
    }
  },
   {
    "$addFields": {
      "can_update_group_info": {
        "$anyElementTrue": {
          "$map": {
            "input": { 
              "$ifNull": [
                { "$arrayElemAt": ["$group_info.permissions.course_discussion_manage", 0] }, 
                []
              ] 
            },
            "as": "permission",
            "in": { "$eq": ["$$permission", "$role"] }
          }
        }
      }
    }
  },
  {
    "$match": {
      "can_update_group_info": true
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserhaspermissiontomanagediscussionConfig = typeof ISUSERHASPERMISSIONTOMANAGEDISCUSSION;