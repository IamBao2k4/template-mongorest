import { FastifyInstance } from 'fastify';
import { UserTimeLearningController } from './user-time-learning.controller';

export async function userTimeLearningRouter(fastify: FastifyInstance) {
  const controller = new UserTimeLearningController();

  fastify.put('/user-time-learning/:id', controller.update.bind(controller));
}