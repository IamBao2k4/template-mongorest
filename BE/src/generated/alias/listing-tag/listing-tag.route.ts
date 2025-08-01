import { FastifyInstance } from 'fastify';
import { ListingTagController } from './listing-tag.controller';

export async function listingTagRouter(fastify: FastifyInstance) {
  const controller = new ListingTagController();

  fastify.get('/list/listing-tag', controller.getList.bind(controller));
}