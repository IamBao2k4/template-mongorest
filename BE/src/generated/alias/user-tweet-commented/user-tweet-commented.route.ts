import { FastifyInstance } from 'fastify';
import { UserTweetCommentedController } from './user-tweet-commented.controller';

export async function userTweetCommentedRouter(fastify: FastifyInstance) {
  const controller = new UserTweetCommentedController();

  fastify.get('/list/user-tweet-commented', controller.getList.bind(controller));
}