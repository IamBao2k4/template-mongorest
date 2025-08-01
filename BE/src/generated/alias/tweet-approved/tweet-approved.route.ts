import { FastifyInstance } from 'fastify';
import { TweetApprovedController } from './tweet-approved.controller';

export async function tweetApprovedRouter(fastify: FastifyInstance) {
  const controller = new TweetApprovedController();

  fastify.put('/tweet-approved/:id', controller.update.bind(controller));
}