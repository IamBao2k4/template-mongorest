export const ISCOMMENTBEMINE = {
  _id: "676e5a34beadbd78b8083e8c",
  title: "is-comment-be-mine",
  entity: [
  "6764e3926e57acaf6815ab97"
],
  data: {
  "id": "66bbd66e-11c1-4b27-80b1-b3b575f7d51c",
  "rules": [
    {
      "id": "5f6b9401-6c12-4aa8-98b3-71ece190e80c",
      "field": "mge-tweet-comment._id",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-tweet-comment._id:param._id"
    },
    {
      "id": "6710ce08-6a91-42f2-878c-647ee5c95186",
      "field": "mge-tweet-comment.created_by",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-tweet-comment.created_by:jwt.user@id"
    }
  ],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"mge-tweet-comment._id":"$mge-tweet-comment._id:param._id"},{"mge-tweet-comment.created_by":"$mge-tweet-comment.created_by:jwt.user@id"}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IscommentbemineConfig = typeof ISCOMMENTBEMINE;