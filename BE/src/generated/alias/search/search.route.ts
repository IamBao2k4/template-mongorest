import { FastifyInstance } from 'fastify';
import { SearchController } from './search.controller';

export async function searchRouter(fastify: FastifyInstance) {
  const controller = new SearchController();

  fastify.get('/list/search', controller.getList.bind(controller));
}