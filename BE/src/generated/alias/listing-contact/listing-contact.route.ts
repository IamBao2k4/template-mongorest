import { FastifyInstance } from 'fastify';
import { ListingContactController } from './listing-contact.controller';

export async function listingContactRouter(fastify: FastifyInstance) {
  const controller = new ListingContactController();

  fastify.get('/list/listing-contact', controller.getList.bind(controller));
  fastify.post('/listing-contact', controller.create.bind(controller));
  fastify.put('/listing-contact/:id', controller.update.bind(controller));
  fastify.get('/listing-contact/:id', controller.getDetail.bind(controller));
}