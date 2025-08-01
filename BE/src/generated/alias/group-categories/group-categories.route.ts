import { FastifyInstance } from 'fastify';
import { GroupCategoriesController } from './group-categories.controller';

export async function groupCategoriesRouter(fastify: FastifyInstance) {
  const controller = new GroupCategoriesController();

  fastify.post('/group-categories', controller.create.bind(controller));
  fastify.put('/group-categories/:id', controller.update.bind(controller));
  fastify.delete('/group-categories/:id', controller.delete.bind(controller));
  fastify.get('/list/group-categories', controller.getList.bind(controller));
  fastify.get('/group-categories/:id', controller.getDetail.bind(controller));
}