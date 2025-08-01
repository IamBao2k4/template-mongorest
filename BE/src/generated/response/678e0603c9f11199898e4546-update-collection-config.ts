export const UPDATE_COLLECTION = {
  _id: "678e0603c9f11199898e4546",
  title: "update collection",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "675b99f99279b9d81247c3ba"
],
  queryAdvance: `{
  "title":0,
  "short_description":0,
  "featured_image":0,
  "position":0
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  data: {
  "id": "20f0b086-372d-4196-810f-7b3b8fe61377",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type UpdateCollectionConfig = typeof UPDATE_COLLECTION;