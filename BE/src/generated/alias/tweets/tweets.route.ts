import { FastifyInstance } from 'fastify';
import { TweetsController } from './tweets.controller';

export async function tweetsRouter(fastify: FastifyInstance) {
  const controller = new TweetsController();

  fastify.get('/list/tweets', controller.getList.bind(controller));
}