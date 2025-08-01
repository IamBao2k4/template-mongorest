import { FastifyInstance } from 'fastify';
import { CourseCartController } from './course-cart.controller';

export async function courseCartRouter(fastify: FastifyInstance) {
  const controller = new CourseCartController();

  fastify.post('/course-cart', controller.create.bind(controller));
  fastify.put('/course-cart/:id', controller.update.bind(controller));
  fastify.delete('/course-cart/:id', controller.delete.bind(controller));
  fastify.get('/list/course-cart', controller.getList.bind(controller));
}