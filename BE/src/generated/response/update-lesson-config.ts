export const UPDATE_LESSON = {
  _id: "678682bc6d9b09071159c4f2",
  title: "update lesson",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752a70b65017d942f75941d"
],
  queryAdvance: `{
  "title": 0,
  "slug": 0,
  "time_learning": 0,
  "chapters": 0,
  "lesson_type": "text,video,file",
  "video_url": 0,
  "video_file": 0,
  "files": 0,
  "lesson_content": 0,
  "resources": 0,
  "position": 0
}
`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  data: {
  "id": "34d5a3a3-1862-4cf8-86aa-0753ba1791ca",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "slug",
    "value": "slug"
  },
  {
    "key": "lesson_type",
    "value": "lesson_type"
  },
  {
    "key": "_id",
    "value": "_id"
  },
  {
    "key": "created_by",
    "value": "created_by"
  },
  {
    "key": "updated_by",
    "value": "updated_by"
  },
  {
    "key": "created_at",
    "value": "created_at"
  },
  {
    "key": "updated_at",
    "value": "updated_at"
  }
],
  id: "678682bc6d9b09071159c4f2",
} as const;

export type UpdateLessonConfig = typeof UPDATE_LESSON;