export const USERHASSTATUSLEFTINGROUP = {
  _id: "67aece6ad1c6615c63d614bb",
  title: "user-has-status-left-in-group",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "41a80e63-2f91-449a-bc7f-240f77a02dde",
  "rules": [
    {
      "id": "beadd92f-1107-4d59-920b-78849efb80e6",
      "field": "mge-group-member._id",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-group-member._id:param._id"
    },
    {
      "id": "859d2442-9588-40d1-a22c-920ce63cce65",
      "field": "mge-group-member.status",
      "operator": "=",
      "valueSource": "value",
      "value": "left"
    }
  ],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"mge-group-member._id":"$mge-group-member._id:param._id"},{"mge-group-member.status":"left"}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type UserhasstatusleftingroupConfig = typeof USERHASSTATUSLEFTINGROUP;