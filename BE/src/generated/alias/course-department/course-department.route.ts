import { FastifyInstance } from 'fastify';
import { CourseDepartmentController } from './course-department.controller';

export async function courseDepartmentRouter(fastify: FastifyInstance) {
  const controller = new CourseDepartmentController();

  fastify.get('/list/course-department', controller.getList.bind(controller));
}