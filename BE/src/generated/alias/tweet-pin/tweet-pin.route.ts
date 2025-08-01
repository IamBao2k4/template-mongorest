import { FastifyInstance } from 'fastify';
import { TweetPinController } from './tweet-pin.controller';

export async function tweetPinRouter(fastify: FastifyInstance) {
  const controller = new TweetPinController();

  fastify.post('/tweet-pin', controller.create.bind(controller));
  fastify.get('/list/tweet-pin', controller.getList.bind(controller));
  fastify.delete('/tweet-pin/:id', controller.delete.bind(controller));
}