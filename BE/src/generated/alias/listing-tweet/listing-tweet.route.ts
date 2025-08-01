import { FastifyInstance } from 'fastify';
import { ListingTweetController } from './listing-tweet.controller';

export async function listingTweetRouter(fastify: FastifyInstance) {
  const controller = new ListingTweetController();

  fastify.post('/listing-tweet', controller.create.bind(controller));
  fastify.put('/listing-tweet/:id', controller.update.bind(controller));
  fastify.delete('/listing-tweet/:id', controller.delete.bind(controller));
  fastify.get('/listing-tweet/:id', controller.getDetail.bind(controller));
  fastify.get('/list/listing-tweet', controller.getList.bind(controller));
}