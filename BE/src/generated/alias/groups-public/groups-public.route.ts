import { FastifyInstance } from 'fastify';
import { GroupsPublicController } from './groups-public.controller';

export async function groupsPublicRouter(fastify: FastifyInstance) {
  const controller = new GroupsPublicController();

  fastify.get('/list/groups-public', controller.getList.bind(controller));
}