import { FastifyInstance } from 'fastify';
import { UserTweetsController } from './user-tweets.controller';

export async function userTweetsRouter(fastify: FastifyInstance) {
  const controller = new UserTweetsController();

  fastify.get('/list/user-tweets', controller.getList.bind(controller));
}