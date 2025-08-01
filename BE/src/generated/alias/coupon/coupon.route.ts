import { FastifyInstance } from 'fastify';
import { CouponController } from './coupon.controller';

export async function couponRouter(fastify: FastifyInstance) {
  const controller = new CouponController();

  fastify.get('/list/coupon', controller.getList.bind(controller));
  fastify.get('/coupon/:id', controller.getDetail.bind(controller));
  fastify.post('/coupon', controller.create.bind(controller));
  fastify.put('/coupon/:id', controller.update.bind(controller));
  fastify.delete('/coupon/:id', controller.delete.bind(controller));
}