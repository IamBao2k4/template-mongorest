export const GET_LIST_ALL_ENTITIES = {
  _id: "686b45650e80fc09613676ae",
  title: "get list all entities",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "686c88980e80fc0961371642"
],
  queryAdvance: `[
  {
    "$sort": {
      "created_at": -1
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
]
`,
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
  restricted: [
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "mongodb_collection_name",
    "value": "mongodb_collection_name"
  },
  {
    "key": "entity_group",
    "value": "entity_group"
  },
  {
    "key": "unique_keys",
    "value": "unique_keys"
  },
  {
    "key": "use_parent",
    "value": "use_parent"
  },
  {
    "key": "use_locale",
    "value": "use_locale"
  },
  {
    "key": "use_block",
    "value": "use_block"
  },
  {
    "key": "use_seo_path",
    "value": "use_seo_path"
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
  id: "686b45650e80fc09613676ae",
} as const;

export type GetListAllEntitiesConfig = typeof GET_LIST_ALL_ENTITIES;