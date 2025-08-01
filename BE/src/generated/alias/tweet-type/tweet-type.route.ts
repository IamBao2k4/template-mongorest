import { FastifyInstance } from 'fastify';
import { TweetTypeController } from './tweet-type.controller';

export async function tweetTypeRouter(fastify: FastifyInstance) {
  const controller = new TweetTypeController();

  fastify.get('/list/tweet-type', controller.getList.bind(controller));
}