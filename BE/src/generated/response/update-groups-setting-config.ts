export const UPDATE_GROUPS_SETTING = {
  _id: "6773aeb8ab2649a80d75bac1",
  title: "update group's setting",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6747ef07c47463d88f8c5ab1"
],
  queryAdvance: `{
 "permissions" : {
  "post_create":"owner,manager,member",
  "group_info_update":"owner,manager,member",
  "group_member_update":"owner,manager,member",
  "group_member_add":"owner,manager,member",
  "group_member_remove":"owner,manager,member",
  "group_category_create":"owner,manager,member",
  "group_category_update":"owner,manager,member",
  "group_category_delete":"owner,manager,member",
  "group_menu_item_create":"owner,manager,member",
  "group_menu_item_update":"owner,manager,member",
  "tweet_delete":"owner,manager,member",
  "group_reports_manage":"owner,manager,member",
  "tweet_store_create":"owner,manager,member",
  "tweet_store_manage":"owner,manager,member",
  "tweet_reject_create":"owner,manager,member",
  "tweet_reject_manage":"owner,manager,member",
  "tweet_waiting_create":"owner,manager,member",
  "tweet_waiting_manage":"owner,manager,member",
  "tweet_approve":"owner,manager,member",
  "tweet_send_to_review_manage":"owner,manager,member",
  "tweet_approve_mode":"true,false",
  "tweet_like_mode":"true,false",
  "tweet_edited_approve_mode":"true,false"
 }
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type UpdateGroupsSettingConfig = typeof UPDATE_GROUPS_SETTING;