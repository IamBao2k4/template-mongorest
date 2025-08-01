export const USERJOINEDGROUP_NO_EXCEPT_GROUP_PAUSE = {
  _id: "67c51934cb2d3f0de0495ae4",
  title: "user-joined-group (no except group pause)",
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
      "user": "@jwt:user.id",
      "status": "joined",
      "$or":[
        {"social_group": "@param:group_id"},
        {"social_group":"@param:_id"},
        {"social_group":"@body:social_group"}
        ]
      
    }
  },
    {
        "$addFields": {
            "social_group_as_objectId": {
                "$map": {
                    "input": "$social_group",
                    "as": "sg",
                    "in": { "$toObjectId": "$$sg" }
                }
            }
        }
    },
    {
        "$lookup": {
            "from": "mge-group",
            "localField": "social_group_as_objectId",
            "foreignField": "_id",
            "as": "group_data"
        }
    },
    {
        "$match": {
            "group_data": { "$ne": [] }
        }
    }

 ]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type UserjoinedgroupNoExceptGroupPauseConfig = typeof USERJOINEDGROUP_NO_EXCEPT_GROUP_PAUSE;