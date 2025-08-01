import { FastifyInstance } from 'fastify';
import { SocialTagController } from './social-tag.controller';

export async function socialTagRouter(fastify: FastifyInstance) {
  const controller = new SocialTagController();

  fastify.get('/list/social-tag', controller.getList.bind(controller));
  fastify.post('/social-tag', controller.create.bind(controller));
  fastify.put('/social-tag/:id', controller.update.bind(controller));
  fastify.delete('/social-tag/:id', controller.delete.bind(controller));
  fastify.get('/social-tag/:id', controller.getDetail.bind(controller));
}