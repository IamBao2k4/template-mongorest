import { FastifyInstance } from 'fastify';
import { TweetSavedController } from './tweet-saved.controller';

export async function tweetSavedRouter(fastify: FastifyInstance) {
  const controller = new TweetSavedController();

  fastify.post('/tweet-saved', controller.create.bind(controller));
  fastify.get('/list/tweet-saved', controller.getList.bind(controller));
  fastify.delete('/tweet-saved/:id', controller.delete.bind(controller));
  fastify.put('/tweet-saved/:id', controller.update.bind(controller));
}