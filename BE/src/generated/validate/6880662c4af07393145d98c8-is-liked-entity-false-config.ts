export const IS_LIKED_ENTITY_FALSE = {
  _id: "6880662c4af07393145d98c8",
  title: "is liked entity: false",
  entity: [
  "676a2762dedfcf1bf1c55abf"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  advance: `[
  {
    "$facet": {
      "matched": [
        { "$match": { "entity_id": "@param:tweet_id" } }
      ]
    }
  },
  {
    "$project": {
      "result": {
       "$cond": {
          "if": { "$gt": [{ "$size": "$matched" }, 0] },
          "then": [],
          "else": [{ "result": false }]
        }
      }
    }
  },
  {
    "$unwind": "$result"
  }
]
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

export type IsLikedEntityFalseConfig = typeof IS_LIKED_ENTITY_FALSE;