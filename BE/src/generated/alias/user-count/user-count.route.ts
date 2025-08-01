import { FastifyInstance } from 'fastify';
import { UserCountController } from './user-count.controller';

export async function userCountRouter(fastify: FastifyInstance) {
  const controller = new UserCountController();

  fastify.get('/list/user-count', controller.getList.bind(controller));
}