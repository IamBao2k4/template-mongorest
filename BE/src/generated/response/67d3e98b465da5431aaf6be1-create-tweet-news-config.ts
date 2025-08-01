export const CREATE_TWEET_NEWS = {
  _id: "67d3e98b465da5431aaf6be1",
  title: "create tweet news",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c66d92cb2d3f0de04bccc1"
],
  queryAdvance: `{
  "title": 1,
  "slug": 0,
  "featured_image": 0,
  "short_description": 0,
  "long_description": 0,
  "category": 0,
  "status": "active,deleted,draft,hidden,archive,waiting",
  "approve_at": 0,
  "approve_by": 0,
  "type":"news"
}`,
  categories: [],
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type CreateTweetNewsConfig = typeof CREATE_TWEET_NEWS;