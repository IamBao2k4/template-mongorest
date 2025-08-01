export const GET_LIST_CONTACT = {
  _id: "67d393f2abd10f64f00cdb45",
  title: "get list contact",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67d29b47b6962f9420f43ebb"
],
  queryAdvance: `[
  {
    "$match": {
      "$expr": {
        "$and": [
          {
            "$cond": {
              "if": {
                "$ne": [
                  "@param:type[]",
                  null
                ]
              },
              "then": {
                "$gt": [
                  {
                    "$size": {
                      "$filter": {
                        "input": "@param:type[]",
                        "as": "typeItem",
                        "cond": {
                          "$in": [
                            "$$typeItem",
                            "$type"
                          ]
                        }
                      }
                    }
                  },
                  0
                ]
              },
              "else": true
            }
          },
          {
            "$cond": {
              "if": {
                "$ne": [
                  "@param:city",
                  null
                ]
              },
              "then": {
                "$and": [
                  {
                    "$eq": [
                      "$address.city",
                      "@param:city"
                    ]
                  },
                  {
                    "$cond": {
                      "if": {
                        "$ne": [
                          "@param:district",
                          null
                        ]
                      },
                      "then": {
                        "$and": [
                          {
                            "$eq": [
                              "$address.district",
                              "@param:district"
                            ]
                          },
                          {
                            "$cond": {
                              "if": {
                                "$ne": [
                                  "@param:ward",
                                  null
                                ]
                              },
                              "then": {
                                "$eq": [
                                  "$address.ward",
                                  "@param:ward"
                                ]
                              },
                              "else": true
                            }
                          }
                        ]
                      },
                      "else": true
                    }
                  }
                ]
              },
              "else": true
            }
          }
        ]
      }
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
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
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
    "value": "type[]",
    "key": "type[]"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListContactConfig = typeof GET_LIST_CONTACT;