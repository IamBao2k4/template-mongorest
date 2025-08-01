import { FastifyInstance } from 'fastify';
import { UserOverviewController } from './user-overview.controller';

export async function userOverviewRouter(fastify: FastifyInstance) {
  const controller = new UserOverviewController();

  fastify.get('/list/user-overview', controller.getList.bind(controller));
}