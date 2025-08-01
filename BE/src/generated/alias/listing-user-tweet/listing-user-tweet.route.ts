import { FastifyInstance } from 'fastify';
import { ListingUserTweetController } from './listing-user-tweet.controller';

export async function listingUserTweetRouter(fastify: FastifyInstance) {
  const controller = new ListingUserTweetController();

  fastify.get('/list/listing-user-tweet', controller.getList.bind(controller));
}