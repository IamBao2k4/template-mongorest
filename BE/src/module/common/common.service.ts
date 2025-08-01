import { HttpError } from "../../utils/http-error";
import { coreGlobal } from "../../configs/core-global";
import { DatabaseType } from "../../core/adapters/base/types";
import { IntermediateQueryResult } from "../../core/types/intermediateQuery";
import { Relationship } from "../../core/adapters/base/relationship/mainRelationship";
import { OptionsInput } from "../../core/types";

export interface PaginatedResult<T> {
  limit: number;
  skip: number;
  documents: T[];
  count: number;
}

class CommonService {
  constructor() {
    console.log("CommonService Initialized");
  }

  async findAllQuery(
    collectionName: string,
    queryData: any = {},
    options?: OptionsInput
  ): Promise<IntermediateQueryResult<any>> {
    const relation =
      coreGlobal.relationshipRegistry.getForTable(collectionName);
    queryData.limit = queryData.limit ? queryData.limit : 10;
    console.log(relation, JSON.stringify(relation));
    if (relation.length > 0) {
      if (queryData.select == undefined) {
        queryData.select = "*";
        relation.forEach((item: any) => {
          queryData.select += `,${item.name}()`;
        });
      }
    }
    queryData.offset = 0
    if (queryData.page) {
      const limit = queryData.limit ?? 10;
      queryData.offset = `${(queryData.page - 1)  * limit}`;
    }
    console.log("query", queryData);
    const result = coreGlobal
      .getCore()
      .findAll(queryData as any, collectionName, options);
    return result;
  }

  async findOne(
    collectionName: string,
    queryData: any = {},
    id: string,
    options?: OptionsInput
  ): Promise<IntermediateQueryResult<any> | null> {
    const relation =
      coreGlobal.relationshipRegistry.getForTable(collectionName);
    queryData.limit = queryData.limit ? queryData.limit : 10;
    if (relation.length > 0) {
      if (queryData.select == undefined) {
        queryData.select = "*";
        relation.forEach((item: any) => {
          queryData.select += `,${item.name}()`;
        });
      }
    }
    return coreGlobal
      .getCore()
      .findById(collectionName, queryData, id, options);
  }

  async create(
    collectionName: string,
    createDto: any,
    options?: OptionsInput
  ): Promise<any> {
    return await coreGlobal
      .getCore()
      .create(collectionName, createDto, options);
  }

  async update(
    collectionName: string,
    id: string,
    body: any,
    options?: OptionsInput
  ): Promise<any> {
    return await coreGlobal
      .getCore()
      .update(collectionName, id, body, options);
  }

  async partialUpdate(
    collectionName: string,
    id: string,
    body: any,
    options?: OptionsInput
  ): Promise<any> {
    return await coreGlobal
      .getCore()
      .partialUpdate(collectionName, id, body, options);
  }

  async hardDelete(
    collectionName: string,
    id: string,
    options?: OptionsInput
  ): Promise<any> {
    return await coreGlobal.getCore().delete(collectionName, id, options);
  }
}

export const commonService = new CommonService();
