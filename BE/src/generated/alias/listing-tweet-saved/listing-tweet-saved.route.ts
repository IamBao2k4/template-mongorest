import { FastifyInstance } from 'fastify';
import { ListingTweetSavedController } from './listing-tweet-saved.controller';

export async function listingTweetSavedRouter(fastify: FastifyInstance) {
  const controller = new ListingTweetSavedController();

  fastify.post('/listing-tweet-saved', controller.create.bind(controller));
  fastify.delete('/listing-tweet-saved/:id', controller.delete.bind(controller));
  fastify.get('/list/listing-tweet-saved', controller.getList.bind(controller));
}