import { FastifyInstance } from 'fastify';
import { CourseMemberController } from './course-member.controller';

export async function courseMemberRouter(fastify: FastifyInstance) {
  const controller = new CourseMemberController();

  fastify.put('/course-member/:id', controller.update.bind(controller));
}