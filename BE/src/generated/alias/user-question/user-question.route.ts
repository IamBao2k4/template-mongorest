import { FastifyInstance } from 'fastify';
import { UserQuestionController } from './user-question.controller';

export async function userQuestionRouter(fastify: FastifyInstance) {
  const controller = new UserQuestionController();

  fastify.get('/list/user-question', controller.getList.bind(controller));
}