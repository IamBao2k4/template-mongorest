export const GET_LIST_CHAPTERS = {
  _id: "678633c26d9b09071159c206",
  title: "get list chapters",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67529e3265017d942f759319"
],
  queryAdvance: `[
   {
    "$match": {  
      "$or":[
        {"course": "@param:course_id"},
        {"course":"@param:_id"}
        ]
    }
  }, 
  {
    "$facet": {
      "meta_data": [
        {
          "$count": "count"
        },
        {
          "$addFields": {
            "skip": "@param:skip",
            "limit": "@param:limit"
          }
        }
      ],
      "data": [
        {
          "$skip": "@param:skip"
        },
        {
          "$limit": "@param:limit"
        }
      ]
    }
  }
]`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "value": "course_id",
    "key": "course_id"
  },
  {
    "value": "_id",
    "key": "_id"
  },
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListChaptersConfig = typeof GET_LIST_CHAPTERS;