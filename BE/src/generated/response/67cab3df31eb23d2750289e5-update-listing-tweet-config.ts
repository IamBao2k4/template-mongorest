export const UPDATE_LISTING_TWEET = {
  _id: "67cab3df31eb23d2750289e5",
  title: "update listing tweet",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c66d92cb2d3f0de04bccc1"
],
  queryAdvance: `{
  "title": 0,
  "slug": 0,
  "list_image": 0,
  "short_description": 0,
  "long_description": 0,
  "category": 0,
  "status": "active,deleted,approve,hidden,draft,archive,waiting,reject,send_to_review,expire",
  "approve_at": 0,
  "approve_by": 0,
  "expire_at": 0,
  "reject_reason": 0,
  "type": "posts,news",
  "real_estate_features": {
    "price": 0,
    "acreage": 0,
    "price_type": "vnd,price_unit_m2,agreement",
    "legal_document": "ownership_certificate,commodity_trading_contracts,waiting_certificate,more",
    "another_legal_document": 0,
    "furniture": "full,basic,none,more",
    "another_furniture": 0,
    "bed_room": 0,
    "rest_room": 0,
    "floor": 0,
    "house_direction": "east,west,south,north,north_east,north_west,south_east,south_west",
    "balcony_direction": "east,west,south,north,north_east,north_west,south_east,south_west",
    "weight_house": 0,
    "weight_street": 0
  },
  "address": 0,
  "project": 0
}`,
  categories: [],
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "slug",
    "value": "slug"
  },
  {
    "key": "list_image",
    "value": "list_image"
  },
  {
    "key": "short_description",
    "value": "short_description"
  },
  {
    "key": "long_description",
    "value": "long_description"
  },
  {
    "key": "images",
    "value": "images"
  },
  {
    "key": "featured_image",
    "value": "featured_image"
  },
  {
    "key": "categories.id",
    "value": "categories.id"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "approve_at",
    "value": "approve_at"
  },
  {
    "key": "approve_by",
    "value": "approve_by"
  },
  {
    "key": "expire_at",
    "value": "expire_at"
  },
  {
    "key": "reject_reason",
    "value": "reject_reason"
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

export type UpdateListingTweetConfig = typeof UPDATE_LISTING_TWEET;