export const GET_LIST_REPORT_S_REASON = {
  _id: "678490f8f143e1be3763d42f",
  title: "get list report's reason",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674eaf8ac43906b58198de5e"
],
  queryAdvance: `[

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
  },
  {
    "value": "post_type",
    "key": "post_type"
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
  id: "",
} as const;

export type GetListReportsReasonConfig = typeof GET_LIST_REPORT_S_REASON;