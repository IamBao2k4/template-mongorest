export const UPDATE_TWEET_IMAGES = {
  _id: "67724090e240a7d43f0ef5d3",
  title: "update tweet images",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e89c2033700ce36e9f038"
],
  queryAdvance: `{
  "title":0,
  "slug":0,
  "short_description":0,
  "long_description":0,
  "images":0,
  "featured_image":0,
  "categories":0,
  "tag":0,
  "comment_off":0,
  "like_off":0,
  "status":"active,send_to_review,archive,reject",
  "approve_at":0,
  "approve_by":0,
  "published_at":0,
  "report_tweet_off":0,
  "report_comment_off":0
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

export type UpdateTweetImagesConfig = typeof UPDATE_TWEET_IMAGES;