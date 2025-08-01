import { FastifyInstance } from 'fastify';
import { GroupOverviewController } from './group-overview.controller';

export async function groupOverviewRouter(fastify: FastifyInstance) {
  const controller = new GroupOverviewController();

  fastify.get('/group-overview/:id', controller.getDetail.bind(controller));
}