export const DIDUSERJOINCOURSE_THROUGH_DISCUSSION_COMMENT = {
  _id: "6791b299d5b517819522e6e1",
  title: "did-user-join-course (through discussion comment)",
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
      "$or": [
          {"_id": "@param:_id" },
          {"_id": "@param:discussion_comment_id"}
        ]
    }
  },
  {
        "$addFields": {
            "discussion_id": {
                "$map": {
                    "input": "$discussion",
                    "as": "sg",
                    "in": { "$toObjectId": "$$sg" }
                }
            }
        }
    },
    {
        "$lookup": {
            "from": "mge-discussions",
            "localField": "discussion_id",
            "foreignField": "_id",
            "pipeline": [
                              {
        "$lookup": {
            "from": "mge-course-member",
            "localField": "course",
            "foreignField": "course",
            "pipeline": [
              {
                "$match": {
                  "user":"@jwt:user.id",
                  "status":"joined"
                }
              }
            ],
            "as": "memberStatus"
        }
    },
                    {
        "$addFields": {
            "course": {
                "$map": {
                    "input": "$course",
                    "as": "sg",
                    "in": { "$toObjectId": "$$sg" }
                }
            }
        }
    },
                  {
        "$lookup": {
            "from": "mge-courses",
            "localField": "course",
            "foreignField": "_id",
            "as": "course_data",
            "pipeline": [
                {
                    "$match": {
                        "status": "active"
                    }
                }
            ]
        }
    }
            ],
            "as": "discussion_info"
        }
    },
    {
        "$match": {
            "discussion_info.memberStatus": { "$ne": [] },
            "discussion_info.course_data": { "$ne": [] }
          
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
  },
  {
    "value": "discussion_id",
    "key": "discussion_id"
  },
  {
    "value": "discussion_comment_id",
    "key": "discussion_comment_id"
  }
],
} as const;

export type DiduserjoincourseThroughDiscussionCommentConfig = typeof DIDUSERJOINCOURSE_THROUGH_DISCUSSION_COMMENT;