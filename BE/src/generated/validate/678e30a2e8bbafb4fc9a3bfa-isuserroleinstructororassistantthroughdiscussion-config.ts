export const ISUSERROLEINSTRUCTORORASSISTANTTHROUGHDISCUSSION = {
  _id: "678e30a2e8bbafb4fc9a3bfa",
  title: "is-user-role-instructor-or-assistant-through-discussion",
  entity: [
  "6752bcd265017d942f759541"
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
    "$lookup": {
      "from": "mge-course-member",
      "localField": "course",
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

export type IsuserroleinstructororassistantthroughdiscussionConfig = typeof ISUSERROLEINSTRUCTORORASSISTANTTHROUGHDISCUSSION;