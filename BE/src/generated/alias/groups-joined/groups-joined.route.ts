import { FastifyInstance } from 'fastify';
import { GroupsJoinedController } from './groups-joined.controller';

export async function groupsJoinedRouter(fastify: FastifyInstance) {
  const controller = new GroupsJoinedController();

  fastify.get('/list/groups-joined', controller.getList.bind(controller));
}