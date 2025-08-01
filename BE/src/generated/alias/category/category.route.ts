import { FastifyInstance } from 'fastify';
import { CategoryController } from './category.controller';

export async function categoryRouter(fastify: FastifyInstance) {
  const controller = new CategoryController();

  fastify.post('/category', controller.create.bind(controller));
  fastify.put('/category/:id', controller.update.bind(controller));
  fastify.get('/list/category', controller.getList.bind(controller));
  fastify.get('/category/:id', controller.getDetail.bind(controller));
  fastify.delete('/category/:id', controller.delete.bind(controller));
}