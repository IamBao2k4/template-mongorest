import { FastifyInstance } from 'fastify';
import { SocialUserController } from './social-user.controller';

export async function socialUserRouter(fastify: FastifyInstance) {
  const controller = new SocialUserController();

  fastify.get('/list/social-user', controller.getList.bind(controller));
  fastify.put('/social-user/:id', controller.update.bind(controller));
}