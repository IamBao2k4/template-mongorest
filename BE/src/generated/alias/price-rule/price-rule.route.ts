import { FastifyInstance } from 'fastify';
import { PriceRuleController } from './price-rule.controller';

export async function priceRuleRouter(fastify: FastifyInstance) {
  const controller = new PriceRuleController();

  fastify.get('/list/price-rule', controller.getList.bind(controller));
  fastify.get('/price-rule/:id', controller.getDetail.bind(controller));
  fastify.post('/price-rule', controller.create.bind(controller));
  fastify.put('/price-rule/:id', controller.update.bind(controller));
  fastify.delete('/price-rule/:id', controller.delete.bind(controller));
}