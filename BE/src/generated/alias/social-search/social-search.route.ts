import { FastifyInstance } from 'fastify';
import { SocialSearchController } from './social-search.controller';

export async function socialSearchRouter(fastify: FastifyInstance) {
  const controller = new SocialSearchController();

  fastify.get('/list/social-search', controller.getList.bind(controller));
}