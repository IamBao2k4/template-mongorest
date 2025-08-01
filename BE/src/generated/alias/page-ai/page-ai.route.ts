import { FastifyInstance } from 'fastify';
import { PageAiController } from './page-ai.controller';

export async function pageAiRouter(fastify: FastifyInstance) {
  const controller = new PageAiController();

  fastify.get('/list/page-ai', controller.getList.bind(controller));
}