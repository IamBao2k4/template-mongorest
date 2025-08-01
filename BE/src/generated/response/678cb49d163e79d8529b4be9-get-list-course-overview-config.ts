export const GET_LIST_COURSE_OVERVIEW = {
  _id: "678cb49d163e79d8529b4be9",
  title: "get list course overview",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67529e3265017d942f759319"
],
  queryAdvance: `[
  {
    "$match": {
      "course":"@param:course_id"
    }
  },
  {
    "$addFields": {
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-lessons",
      "localField": "_id",
      "foreignField": "chapters",
      "as": "lessons"
    }
  },
  {
    "$lookup": {
      "from": "mge-exams",
      "localField": "_id",
      "foreignField": "chapter",
      "as": "exams"
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
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  }
],
  headers: [],
  data: {
  "id": "b824665b-a138-413c-8690-34619d5e7eaf",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type GetListCourseOverviewConfig = typeof GET_LIST_COURSE_OVERVIEW;