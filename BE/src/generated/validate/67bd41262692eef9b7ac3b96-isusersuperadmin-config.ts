export const ISUSERSUPERADMIN = {
  _id: "67bd41262692eef9b7ac3b96",
  title: "is-user-super-admin",
  entity: [
  "6757b1998659c9e98a2f1e2b"
],
  data: {
  "id": "78981c87-7969-40fc-bb73-819dd48bedcc",
  "rules": [
    {
      "id": "ac789273-ac64-485e-b0b4-a7182d8d6223",
      "field": "user-tenant-level-mapping.user",
      "operator": "=",
      "valueSource": "value",
      "value": "$user-tenant-level-mapping.user:jwt.user@id"
    },
    {
      "id": "5e69b4bf-4a2c-44bd-a1bc-0b0d03378956",
      "field": "user-tenant-level-mapping.tenant_level",
      "operator": "=",
      "valueSource": "value",
      "value": [
        {
          "_id": "6785cc3c4c9747dfaeed60d3",
          "title": "superadmin",
          "locale": null,
          "locale_id": null,
          "created_at": "2025-01-14T09:30:20.000Z",
          "created_by": {
            "_id": "6711e8a47b45b2974bd6133c",
            "username": "admin2024@gmail.com",
            "featured_image": [
              {
                "_id": "67b58f48daf8793d547d45f9",
                "filename": "af17a5d3-8723-46f7-8e17-62b237b12bc1.jpg",
                "disk": "satellite",
                "mime": "image/jpeg",
                "size": 75219,
                "title": "gratisography-cool-cat-800x525.jpg",
                "alt": "gratisography-cool-cat-800x525.jpg",
                "tenant_id": "674028d2611a654e763a73e8",
                "created_by": "6711e8a47b45b2974bd6133c",
                "created_at": "2025-02-19T14:59:04.000Z",
                "updated_at": "2025-02-19T14:59:04.000Z",
                "is_draft": true,
                "__v": 0,
                "path": "https://mgs-storage.sgp1.digitaloceanspaces.com/satellite/af17a5d3-8723-46f7-8e17-62b237b12bc1.jpg"
              }
            ],
            "first_name": "Trần",
            "last_name": "Thanh Hải"
          },
          "updated_at": "2025-01-14T09:30:20.000Z",
          "updated_by": {
            "_id": "6711e8a47b45b2974bd6133c",
            "username": "admin2024@gmail.com",
            "featured_image": [
              {
                "_id": "67b58f48daf8793d547d45f9",
                "filename": "af17a5d3-8723-46f7-8e17-62b237b12bc1.jpg",
                "disk": "satellite",
                "mime": "image/jpeg",
                "size": 75219,
                "title": "gratisography-cool-cat-800x525.jpg",
                "alt": "gratisography-cool-cat-800x525.jpg",
                "tenant_id": "674028d2611a654e763a73e8",
                "created_by": "6711e8a47b45b2974bd6133c",
                "created_at": "2025-02-19T14:59:04.000Z",
                "updated_at": "2025-02-19T14:59:04.000Z",
                "is_draft": true,
                "__v": 0,
                "path": "https://mgs-storage.sgp1.digitaloceanspaces.com/satellite/af17a5d3-8723-46f7-8e17-62b237b12bc1.jpg"
              }
            ],
            "first_name": "Trần",
            "last_name": "Thanh Hải"
          },
          "tenant_id": "677f6b3da3131eb0d3f9906d"
        }
      ]
    }
  ],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"user-tenant-level-mapping.user":"$user-tenant-level-mapping.user:jwt.user@id"},{"user-tenant-level-mapping.tenant_level":["6785cc3c4c9747dfaeed60d3"]}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "677f6b3da3131eb0d3f9906d",
  advance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$addFields": {
      "tenant_level": {
        "$map": {
          "input": "$tenant_level",
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
      "from": "user-tenant-level",
      "localField": "tenant_level",
      "foreignField": "_id",
      "pipeline": [
        {
          "$match": {
            "title": "superadmin"
          }
        }
      ],
      "as": "tenant_level"
    }
  },
  {
    "$match": {
      "tenant_level": {
        "$ne": []
      }
    }
  },
  {
    "$addFields": {
      "user": {
        "$map": {
          "input": "$user",
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
      "from": "user-tenant-profile",
      "localField": "user",
      "foreignField": "_id",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id",
            "user": "@jwt:user.id"
          }
        }
      ],
      "as": "is_user_from_jwt"
    }
  },
  {
    "$match": {
      "is_user_from_jwt": {
        "$ne": []
      }
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  params: null,
} as const;

export type IsusersuperadminConfig = typeof ISUSERSUPERADMIN;