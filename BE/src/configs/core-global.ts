
import { Db } from "mongodb";
import { CoreBootstrap, createCoreSystem } from "../core/main/connect";
import { NewCore } from "../core/main/newCore";
import { EntityManager } from "../manager";
import { settingCore } from "./app-settings";
import { MyCustomDb } from "../core/adapters/mongodb/customs/DbCustom";
export let coreGlobal: CoreBootstrap;
export const InitialCore = async () => {
  coreGlobal = new CoreBootstrap();
  await coreGlobal.initializeWithConfig(settingCore)
  const watching = await new EntityManager(coreGlobal.relationshipRegistry)
  // if (db) {
  //   const response = await (db as MyCustomDb).collection("collection").aggregate()
  // }
};

export const filterPassword = (obj: any) => {
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (key.toLowerCase().includes('password')) {
        console.log(key)
        obj[key] = undefined;
      }
    }
  }
  return obj;
}