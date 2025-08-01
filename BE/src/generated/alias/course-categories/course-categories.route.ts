import { FastifyInstance } from 'fastify';
import { CourseCategoriesController } from './course-categories.controller';

export async function courseCategoriesRouter(fastify: FastifyInstance) {
  const controller = new CourseCategoriesController();

  fastify.post('/course-categories', controller.create.bind(controller));
  fastify.put('/course-categories/:id', controller.update.bind(controller));
  fastify.delete('/course-categories/:id', controller.delete.bind(controller));
  fastify.get('/list/course-categories', controller.getList.bind(controller));
  fastify.get('/course-categories/:id', controller.getDetail.bind(controller));
}