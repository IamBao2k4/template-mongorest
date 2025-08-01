import { FastifyInstance } from 'fastify';
import { GroupController } from './group.controller';

export async function groupRouter(fastify: FastifyInstance) {
  const controller = new GroupController();

  fastify.post('/group', controller.create.bind(controller));
  fastify.put('/group/:id', controller.update.bind(controller));
  fastify.get('/group/:id', controller.getDetail.bind(controller));
  fastify.get('/list/group', controller.getList.bind(controller));
}