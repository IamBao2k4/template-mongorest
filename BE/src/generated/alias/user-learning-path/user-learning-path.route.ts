import { FastifyInstance } from 'fastify';
import { UserLearningPathController } from './user-learning-path.controller';

export async function userLearningPathRouter(fastify: FastifyInstance) {
  const controller = new UserLearningPathController();

  fastify.get('/list/user-learning-path', controller.getList.bind(controller));
}