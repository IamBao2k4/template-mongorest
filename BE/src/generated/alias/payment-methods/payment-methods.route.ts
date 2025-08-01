import { FastifyInstance } from 'fastify';
import { PaymentMethodsController } from './payment-methods.controller';

export async function paymentMethodsRouter(fastify: FastifyInstance) {
  const controller = new PaymentMethodsController();

  fastify.get('/list/payment-methods', controller.getList.bind(controller));
  fastify.get('/payment-methods/:id', controller.getDetail.bind(controller));
  fastify.post('/payment-methods', controller.create.bind(controller));
  fastify.put('/payment-methods/:id', controller.update.bind(controller));
  fastify.delete('/payment-methods/:id', controller.delete.bind(controller));
}