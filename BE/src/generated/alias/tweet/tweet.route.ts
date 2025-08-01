import { FastifyInstance } from 'fastify';
import { TweetController } from './tweet.controller';

export async function tweetRouter(fastify: FastifyInstance) {
  const controller = new TweetController();

  fastify.get('/list/tweet', controller.getList.bind(controller));
}