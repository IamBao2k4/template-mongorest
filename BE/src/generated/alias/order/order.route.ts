import { FastifyInstance } from 'fastify';
import { OrderController } from './order.controller';

export async function orderRouter(fastify: FastifyInstance) {
  const controller = new OrderController();

  fastify.get('/list/order', controller.getList.bind(controller));
  fastify.get('/order/:id', controller.getDetail.bind(controller));
  fastify.post('/order', controller.create.bind(controller));
  fastify.put('/order/:id', controller.update.bind(controller));
  fastify.delete('/order/:id', controller.delete.bind(controller));
}