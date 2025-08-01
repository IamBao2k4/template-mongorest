import { BootstrapConfig } from "../core/types";

export const appSettings = {
  appName: process.env.APP_NAME,
  development: false,
  timeZone: process.env.TIME_ZONE,
  timeZoneMongoDB: {
    createdAt: "created_at",
    updatedAt: "updated_at",
    getCurrentTime() {
      return new Date().toLocaleString("en-US", {
        timeZone: appSettings.timeZone,
      });
    },
    getCustomTime(time: string) {
      return new Date(time);
    },
  },
  port: process.env.PORT,
  prefixApi: process.env.PREFIX_API,
  corsOrigin: ["*"],
  mongo: {
    url: process.env.MONGODB_URL || "mongodb://localhost:27017/prototype_3",
    dbName: "test",
    options: "?tls=true&authSource=admin&replicaSet=mangoads-mongodb-2025",
    isReplicaSet: process.env.IS_REPLICA_SET === "true" ? true : false,
  },
};

export const settingCore: BootstrapConfig = {
  includeBuiltinAdapters: false,
  relationships: {
    All: [
      {
        name: "created_by",
        targetTable: "user",
        localField: "created_by",
        foreignField: "_id",
        type: "one-to-one",
      },
      {
        name: "updated_by",
        targetTable: "user",
        localField: "updated_by",
        foreignField: "_id",
        type: "one-to-one",
      },
    ],
    // Your specific relationships for the complex query
    // user: [
    //   {
    //     name: "user_roles",
    //     targetTable: "role",
    //     localField: "role",
    //     foreignField: "_id",
    //     type: "one-to-many"
    //   }
    // ]
    // users: [
    //   {
    //     name: "product_reviews",
    //     targetTable: "product_reviews",
    //     localField: "_id",
    //     foreignField: "userId",
    //     type: "one-to-many",
    //   },
    // ],
    // product_reviews: [
    //   {
    //     name: "products",
    //     targetTable: "products",
    //     localField: "productId",
    //     foreignField: "_id",
    //     type: "one-to-one",
    //   },
    //   {
    //     name: "user",
    //     targetTable: "users",
    //     localField: "userId",
    //     foreignField: "_id",
    //     type: "one-to-one",
    //   },
    // ],
    // orders: [
    //   {
    //     name: "products",
    //     targetTable: "products",
    //     localField: "items.productId",
    //     foreignField: "_id",
    //     type: "many-to-many",
    //   }
    // ],
    // products: [
    //   {
    //     name: "categories",
    //     targetTable: "categories",
    //     localField: "_id",
    //     foreignField: "_id",
    //     type: "many-to-many",
    //     junction: {
    //       table: "product_categories",
    //       localKey: "productId",
    //       foreignKey: "categoryId",
    //     },
    //   },
    //   {
    //     name: "reviews",
    //     targetTable: "product_reviews",
    //     localField: "_id",
    //     foreignField: "productId",
    //     type: "one-to-many",
    //   },{
    //     name: "category",
    //     targetTable: "categories",
    //     localField: "primaryCategoryId",
    //     foreignField: "_id",
    //     type: "one-to-one",
    //   }
    // ],
    // categories: [
    //   {
    //     name: "children",
    //     targetTable: "categories",
    //     localField: "_id",
    //     foreignField: "parentId",
    //     type: "one-to-many",
    //   },
    //   {
    //     name: "parent",
    //     targetTable: "categories",
    //     localField: "parentId",
    //     foreignField: "_id",
    //     type: "many-to-one",
    //   },
    //   {
    //     name: "products",
    //     targetTable: "products",
    //     localField: "_id",
    //     foreignField: "_id",
    //     type: "many-to-many",
    //     junction: {
    //       table: "product_categories",
    //       localKey: "categoryId",
    //       foreignKey: "productId",
    //     },
    //   },
    // ],
  },
  core: {
    adapters: {
      mongodb: {
        connection: {
          connectionString:
            process.env.MONGODB_URL ||
            "mongodb://thaily:Th%40i2004@192.168.1.109:27017/mongorest?authSource=admin",
        },
      },
      // postgresql: {
      //   connection: {
      //     host: process.env.POSTGRES_HOST || "localhost",
      //     port: parseInt(process.env.POSTGRES_PORT || "5432"),
      //     database: process.env.POSTGRES_DB || "mydb",
      //     username: process.env.POSTGRES_USER || "admin",
      //     password: process.env.POSTGRES_PASSWORD || "secret",
      //   },
      // },
      // elasticsearch: {
      //   connection: {
      //     host: process.env.ELASTICSEARCH_HOST || "localhost",
      //     port: parseInt(process.env.ELASTICSEARCH_PORT || "9200"),
      //   },
      // },
      // mysql: {
      //   connection: {
      //     host: process.env.MYSQL_HOST || "localhost",
      //     port: parseInt(process.env.MYSQL_PORT || "3306"),
      //     database: process.env.MYSQL_DB || "myappdb",
      //     username: process.env.MYSQL_USER || "thaily",
      //     password: process.env.MYSQL_PASSWORD || "Th@i2004",
      //   },
      // },
    },
  },
};
