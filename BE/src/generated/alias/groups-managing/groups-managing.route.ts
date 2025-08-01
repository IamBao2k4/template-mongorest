import { FastifyInstance } from 'fastify';
import { GroupsManagingController } from './groups-managing.controller';

export async function groupsManagingRouter(fastify: FastifyInstance) {
  const controller = new GroupsManagingController();

  fastify.get('/list/groups-managing', controller.getList.bind(controller));
}