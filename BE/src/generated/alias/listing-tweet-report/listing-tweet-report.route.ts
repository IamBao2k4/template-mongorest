import { FastifyInstance } from 'fastify';
import { ListingTweetReportController } from './listing-tweet-report.controller';

export async function listingTweetReportRouter(fastify: FastifyInstance) {
  const controller = new ListingTweetReportController();

  fastify.post('/listing-tweet-report', controller.create.bind(controller));
  fastify.delete('/listing-tweet-report/:id', controller.delete.bind(controller));
  fastify.get('/list/listing-tweet-report', controller.getList.bind(controller));
}