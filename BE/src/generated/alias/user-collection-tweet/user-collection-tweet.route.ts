import { FastifyInstance } from 'fastify';
import { UserCollectionTweetController } from './user-collection-tweet.controller';

export async function userCollectionTweetRouter(fastify: FastifyInstance) {
  const controller = new UserCollectionTweetController();

  fastify.get('/list/user-collection-tweet', controller.getList.bind(controller));
}