export const ISNUMBEROFGROUPMEMBERS1 = {
  _id: "67c08edd0bb62abd56e89ab8",
  title: "is-number-of-group-members-1",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  advance: `[
  {
    "$match": {
      "$or": [
        {"social_group":"@param:_id"},
        {"social_group":"@param:group_id"}
        ]
    }
  },
  {
    "$group": {
      "_id": "$social_group",
      "member_count": { "$sum": 1 }
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type Isnumberofgroupmembers1Config = typeof ISNUMBEROFGROUPMEMBERS1;