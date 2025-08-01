import { FastifyInstance } from 'fastify';
import { CourseDetailController } from './course-detail.controller';

export async function courseDetailRouter(fastify: FastifyInstance) {
  const controller = new CourseDetailController();

  fastify.get('/course-detail/:id', controller.getDetail.bind(controller));
}