import { FastifyInstance } from 'fastify';
import { UserTweetSavedController } from './user-tweet-saved.controller';

export async function userTweetSavedRouter(fastify: FastifyInstance) {
  const controller = new UserTweetSavedController();

  fastify.get('/list/user-tweet-saved', controller.getList.bind(controller));
}