import { FastifyInstance } from 'fastify';
import { ShippingMethodsController } from './shipping-methods.controller';

export async function shippingMethodsRouter(fastify: FastifyInstance) {
  const controller = new ShippingMethodsController();

  fastify.get('/list/shipping-methods', controller.getList.bind(controller));
  fastify.get('/shipping-methods/:id', controller.getDetail.bind(controller));
  fastify.post('/shipping-methods', controller.create.bind(controller));
  fastify.put('/shipping-methods/:id', controller.update.bind(controller));
  fastify.delete('/shipping-methods/:id', controller.delete.bind(controller));
}