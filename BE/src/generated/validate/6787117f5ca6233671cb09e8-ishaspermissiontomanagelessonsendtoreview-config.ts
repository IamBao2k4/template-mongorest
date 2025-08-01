export const ISHASPERMISSIONTOMANAGELESSONSENDTOREVIEW = {
  _id: "6787117f5ca6233671cb09e8",
  title: "is-has-permission-to-manage-lesson-send-to-review",
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
                { "$arrayElemAt": ["$group_info.permissions.course_lesson_approve", 0] }, 
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

export type IshaspermissiontomanagelessonsendtoreviewConfig = typeof ISHASPERMISSIONTOMANAGELESSONSENDTOREVIEW;