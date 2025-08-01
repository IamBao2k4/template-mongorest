import { FastifyInstance } from 'fastify';
import { PriceRulesController } from './price-rules.controller';

export async function priceRulesRouter(fastify: FastifyInstance) {
  const controller = new PriceRulesController();

  fastify.post('/price-rules', controller.create.bind(controller));
}