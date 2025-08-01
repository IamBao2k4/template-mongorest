import { FastifyInstance } from 'fastify';
import { ListingTagGroupController } from './listing-tag-group.controller';

export async function listingTagGroupRouter(fastify: FastifyInstance) {
  const controller = new ListingTagGroupController();

  fastify.get('/list/listing-tag-group', controller.getList.bind(controller));
}