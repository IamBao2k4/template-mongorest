export const UPDATE_PROJECT = {
  _id: "67cf9899dada26e67e87d4c8",
  title: "update project",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c6ccd9412d5b4c1e2bf08c"
],
  queryAdvance: `{
  "title": 0,
  "overview_static": {
    "apartment": 0,
    "acreage": 0,
    "tower": 0,
    "site_area": 0,
    "building_density": 0,
    "pricing":0
  },
  "long_description": 0,
  "amenity_facility": "shopping_mall,supermarket_convenience_stores,shophouse,restaurants_coffee_shops,swimming_pool,children_playground,gym_yoga,spa_massage,cinema,bbq_outdoor_area,school,hospital,parking_car,security,community,walking_street,sport_area,park_playground,administrative_center,bus_station,hightway,pccc_systems,atm_banks,exit_way,elevator,receptionist,ac_system,coffee,tenis_area,basketball_area,badminton_area",
  "list_image": 0,
  "address": {
    "city": 0,
    "district": 0,
    "ward": 0,
    "street": 0,
    "full_address": 0
  },
  "status": "active,deleted,approve,draft,hidden,archive,waiting,reject,send_to_review,expire",
  "tag": 0,
  "contact": 0
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

export type UpdateProjectConfig = typeof UPDATE_PROJECT;