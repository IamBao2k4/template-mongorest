export const CREATE_LESSON = {
  _id: "6786582f6d9b09071159c439",
  title: "create lesson",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752a70b65017d942f75941d"
],
  queryAdvance: `{
  "title": 1,
  "slug": 1,
  "time_learning": 0,
  "chapters": 0,
  "lesson_type": "text,video,file",
  "video_url": 0,
  "video_file": 0,
  "files": 0,
  "lesson_content": 0,
  "course": "@param:course_id",
  "resources": 0,
  "position": 0
  }
`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "value": "course_id",
    "key": "course_id"
  }
],
  headers: [],
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
  id: "6786582f6d9b09071159c439",
} as const;

export type CreateLessonConfig = typeof CREATE_LESSON;