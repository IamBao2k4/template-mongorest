import { FastifyInstance } from 'fastify';
import { CourseAddMembersController } from './course-add-members.controller';

export async function courseAddMembersRouter(fastify: FastifyInstance) {
  const controller = new CourseAddMembersController();

  fastify.get('/list/course-add-members', controller.getList.bind(controller));
}