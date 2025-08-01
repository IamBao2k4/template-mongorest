export const TWEETGET_LIST_TWEET_TYPE = {
  _id: "677cfda1a48674774553eec9",
  title: "tweet/get list tweet type",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674eaf8ac43906b58198de5e"
],
  queryAdvance: `[
  {
    "$addFields": {
      "entity_group": {
        "$map": {
          "input": "$entity_group",
          "as": "u",
          "in": {
            "$toObjectId": "$$u"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "entity-group",
      "localField": "entity_group",
      "foreignField": "_id",
      "pipeline": [
        {
          "$match": {
            "title":"tweet"
          }
        }
      ],
      "as": "entity_group_info"
    }
  },
    {
    "$match": {
      "entity_group_info": { "$ne": [] }
    }
  },
  {
    "$project": {
      "title":1,
      "mongodb_collection_name":1,
      "type":1
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
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
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
  "id": "a921b831-0206-4de9-9fbb-44f89a9fe13d",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type TweetgetListTweetTypeConfig = typeof TWEETGET_LIST_TWEET_TYPE;