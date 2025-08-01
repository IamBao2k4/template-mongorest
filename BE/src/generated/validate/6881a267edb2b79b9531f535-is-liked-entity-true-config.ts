export const IS_LIKED_ENTITY_TRUE = {
  _id: "6881a267edb2b79b9531f535",
  title: "is liked entity: true",
  entity: [
  "676a2762dedfcf1bf1c55abf"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  advance: `[{ "$match": { "entity_id": "@param:tweet_id" } }]
`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: [
  {
    "value": "tweet_id",
    "key": "tweet_id"
  }
],
} as const;

export type IsLikedEntityTrueConfig = typeof IS_LIKED_ENTITY_TRUE;