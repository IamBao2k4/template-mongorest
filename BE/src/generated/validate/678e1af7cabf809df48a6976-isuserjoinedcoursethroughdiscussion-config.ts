export const ISUSERJOINEDCOURSETHROUGHDISCUSSION = {
  _id: "678e1af7cabf809df48a6976",
  title: "is-user-joined-course-through-discussion",
  entity: [
  "6752bcd265017d942f759541"
],
  data: {
  "id": "61a1b155-e1a9-49e5-ba34-2990272e2f04",
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
      "$or": [
      {"_id": "@param:_id"},
      {"_id": "@param:discussion_id"}
      ]
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
    },
    {
        "$match": {
            "memberStatus": { "$ne": [] },
            "course_data": { "$ne": [] }
          
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
  }
],
} as const;

export type IsuserjoinedcoursethroughdiscussionConfig = typeof ISUSERJOINEDCOURSETHROUGHDISCUSSION;