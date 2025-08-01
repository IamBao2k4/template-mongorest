export const CREATE_AREA = {
  _id: "67cfaa7edada26e67e87e3b6",
  title: "create area",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67cfaa00dada26e67e87e2f5"
],
  queryAdvance: `{
  "title":1,
  "type":1,
  "parent_id":0
}`,
  categories: [],
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type CreateAreaConfig = typeof CREATE_AREA;