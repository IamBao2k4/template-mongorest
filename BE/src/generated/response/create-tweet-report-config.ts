export const CREATE_TWEET_REPORT = {
  _id: "67cfdc02dada26e67e88016b",
  title: "create tweet report",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67cfd9bedada26e67e87ffc3"
],
  queryAdvance: `{
  "tweet": "@param:tweet_id",
  "reasons": "address_of_real_estate,incorrect_information,incorrect_images,duplicate_listing,unreachable_contact,fake_listing,sold_real_estate,slow_loading,incorrect_real_estate_location,incorrect_amenity_location,map_error,other",
  "another_reason": 0
}`,
  categories: [],
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
  documents: [],
  body: null,
  params: [
  {
    "value": "tweet_id",
    "key": "tweet_id"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type CreateTweetReportConfig = typeof CREATE_TWEET_REPORT;