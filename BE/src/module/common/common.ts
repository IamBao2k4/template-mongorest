import { FastifyInstance } from "fastify";
import { commonService } from "./common.service";
import { JWTGuard } from "../auth";
import { OptionsInput } from "../../core/types";

export async function CommonRoutes(app: FastifyInstance) {
  const jwtGuard = new JWTGuard(app);
  // Get entity list
  app.get(
    "/:entityName",
    { preHandler: jwtGuard.preHandler.bind(jwtGuard) },
    async (request, reply) => {
      const startTime = Date.now();
      const user = request.headers.user
      console.log(user)
      // const options: OptionsInput = {
      //   databaseType: "mongodb",
      //   roles: [`${user}`]
      // }
      const { entityName } = request.params as { entityName: string };
      const queryData = request.query as any;
      const result = await commonService.findAllQuery(entityName, queryData);
      reply.send(result);
    }
  );

  // Get entity details by id
  app.get("/:entityName/:id", async (request, reply) => {
    const { entityName, id } = request.params as {
      entityName: string;
      id: string;
    };
    const queryData = request.query as any;
    const result = await commonService.findOne(entityName, queryData, id);
    return {
      data: result?.data[0],
    };
  });

  // Create new entity
  app.post("/:entityName", async (request, reply) => {
    const { entityName } = request.params as { entityName: string };
    const body = request.body;
    return await commonService.create(entityName, body);
  });

  // Update entity
  app.put("/:entityName/:id", async (request, reply) => {
    const { entityName, id } = request.params as {
      entityName: string;
      id: string;
    };
    const body = request.body;
    return await commonService.update(entityName, id, body);
  });

  // Partial update entity
  app.patch("/:entityName/:id", async (request, reply) => {
    const { entityName, id } = request.params as {
      entityName: string;
      id: string;
    };
    const body = request.body;
    return await commonService.partialUpdate(entityName, id, body);
  });

  // Delete entity
  app.delete("/:entityName/:id", async (request, reply) => {
    const { entityName, id } = request.params as {
      entityName: string;
      id: string;
    };
    return await commonService.hardDelete(entityName, id);
  });
}
