export const UPGRADE_ROLE_COURSE_MEMBER = {
  _id: "6837e3d06b77a55a819dc7cb",
  title: "upgrade role course member",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67853fcd4c9747dfaeed5f84"
],
  queryAdvance: `{
  "user":"@param:user_id",
  "course":"@param:course_id",
  "role":"assistant"
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "course",
    "value": "course"
  },
  {
    "key": "user",
    "value": "user"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "role",
    "value": "role"
  },
  {
    "key": "is_finished",
    "value": "is_finished"
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
  id: "6837e3d06b77a55a819dc7cb",
} as const;

export type UpgradeRoleCourseMemberConfig = typeof UPGRADE_ROLE_COURSE_MEMBER;