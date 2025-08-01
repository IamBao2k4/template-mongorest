import { FastifyInstance } from 'fastify';
import { UserTweetLikedController } from './user-tweet-liked.controller';

export async function userTweetLikedRouter(fastify: FastifyInstance) {
  const controller = new UserTweetLikedController();

  fastify.get('/list/user-tweet-liked', controller.getList.bind(controller));
}