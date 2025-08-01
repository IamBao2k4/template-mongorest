import { FastifyInstance } from 'fastify';
import { CourseTeamController } from './course-team.controller';

export async function courseTeamRouter(fastify: FastifyInstance) {
  const controller = new CourseTeamController();

  fastify.get('/list/course-team', controller.getList.bind(controller));
}