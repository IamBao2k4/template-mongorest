import { FastifyInstance } from 'fastify';
import { CourseManageController } from './course-manage.controller';

export async function courseManageRouter(fastify: FastifyInstance) {
  const controller = new CourseManageController();

  fastify.get('/list/course-manage', controller.getList.bind(controller));
}