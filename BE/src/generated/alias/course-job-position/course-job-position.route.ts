import { FastifyInstance } from 'fastify';
import { CourseJobPositionController } from './course-job-position.controller';

export async function courseJobPositionRouter(fastify: FastifyInstance) {
  const controller = new CourseJobPositionController();

  fastify.get('/list/course-job-position', controller.getList.bind(controller));
}