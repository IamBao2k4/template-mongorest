export const TEST_EMPTY_FIELDS = {
  _id: "test123",
  title: "Test Empty Fields",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [],
  queryAdvance: `{}`,
  categories: [],
  tenant_id: "",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type TestEmptyFieldsConfig = typeof TEST_EMPTY_FIELDS;