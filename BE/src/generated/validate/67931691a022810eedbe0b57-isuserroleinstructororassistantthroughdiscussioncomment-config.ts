export const ISUSERROLEINSTRUCTORORASSISTANTTHROUGHDISCUSSIONCOMMENT = {
  _id: "67931691a022810eedbe0b57",
  title: "is-user-role-instructor-or-assistant-through-discussion-comment",
  entity: [
  "6752c64565017d942f759585"
],
  data: {
  "id": "99f8d782-b26c-4247-a103-58979841a899",
  "rules": [],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"$expr":true}]}`,
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
            "$or": [
              { "role": "instructor" },
              { "role": "assistant" }
            ]
          }
        }
      ],
      "as": "memberStatus"
    }
  },
  {
    "$match": {
      "memberStatus": { "$ne": [] }
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserroleinstructororassistantthroughdiscussioncommentConfig = typeof ISUSERROLEINSTRUCTORORASSISTANTTHROUGHDISCUSSIONCOMMENT;