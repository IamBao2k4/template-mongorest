import { FastifyInstance } from 'fastify';
import { CategoriesController } from './categories.controller';

export async function categoriesRouter(fastify: FastifyInstance) {
  const controller = new CategoriesController();

  fastify.get('/list/categories', controller.getList.bind(controller));
  fastify.get('/categories/:id', controller.getDetail.bind(controller));
}