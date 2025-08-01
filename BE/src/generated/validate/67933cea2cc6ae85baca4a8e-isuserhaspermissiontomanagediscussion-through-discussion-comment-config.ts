export const ISUSERHASPERMISSIONTOMANAGEDISCUSSION_THROUGH_DISCUSSION_COMMENT = {
  _id: "67933cea2cc6ae85baca4a8e",
  title: "is-user-has-permission-to-manage-discussion (through discussion_comment)",
  entity: [
  "6752c64565017d942f759585"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "677f6b3da3131eb0d3f9906d",
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
      "_id":"@param:_id"
    }
  },
  {
    "$addFields": {
      "discussion": {
        "$map": {
          "input": "$discussion",
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
      "from": "mge-discussions",
      "localField": "discussion",
      "foreignField": "_id",
      "as": "discussion_info"
    }
  },
  {
    "$lookup": {
      "from": "mge-course-member",
      "localField": "discussion_info.course",
      "foreignField": "course",
      "pipeline": [
        {
          "$match": {
            "user": "@jwt:user.id",
            "status":"joined"
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
  }
      ],
      "as": "memberStatus"
    }
  },
  {
    "$lookup": {
      "from": "mge-courses",
      "localField": "memberStatus.course",
      "foreignField": "_id",
      "as": "course_info"
    }
  },
  {
    "$addFields": {
      "course_info": { "$arrayElemAt": ["$course_info", 0] }
    }
  },
  {
    "$addFields": {
      "memberStatus": { "$arrayElemAt": ["$memberStatus", 0] }
    }
  },
  {
    "$addFields": {
      "can_manage_discussion_in_course": {
        "$in": [
          "$memberStatus.role", 
          "$course_info.permissions.course_discussion_manage"
        ]
      }
    }
  },
  {
    "$match": {
      "can_manage_discussion_in_course": true
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserhaspermissiontomanagediscussionThroughDiscussionCommentConfig = typeof ISUSERHASPERMISSIONTOMANAGEDISCUSSION_THROUGH_DISCUSSION_COMMENT;