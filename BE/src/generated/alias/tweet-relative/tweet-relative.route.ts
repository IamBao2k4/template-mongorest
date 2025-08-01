import { FastifyInstance } from 'fastify';
import { TweetRelativeController } from './tweet-relative.controller';

export async function tweetRelativeRouter(fastify: FastifyInstance) {
  const controller = new TweetRelativeController();

  fastify.get('/list/tweet-relative', controller.getList.bind(controller));
}