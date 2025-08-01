import { FastifyInstance } from 'fastify';
import { CourseController } from './course.controller';

export async function courseRouter(fastify: FastifyInstance) {
  const controller = new CourseController();

  fastify.post('/course', controller.create.bind(controller));
  fastify.put('/course/:id', controller.update.bind(controller));
  fastify.get('/list/course', controller.getList.bind(controller));
  fastify.get('/course/:id', controller.getDetail.bind(controller));
}