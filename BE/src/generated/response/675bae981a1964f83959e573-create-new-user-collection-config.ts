export const CREATE_NEW_USER_COLLECTION = {
  _id: "675bae981a1964f83959e573",
  title: "Create new user collection",
  note: "Tạo mới bộ sưu tập bài viết đã lưu",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "675b99f99279b9d81247c3ba"
],
  queryAdvance: `{
  "title":1,
  "short_description":0,
  "featured_image":0,
  "is_root":"false,true",
  "position":"1"
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type CreateNewUserCollectionConfig = typeof CREATE_NEW_USER_COLLECTION;