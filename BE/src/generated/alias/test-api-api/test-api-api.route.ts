import { FastifyInstance } from 'fastify';
import { TestApiApiController } from './test-api-api.controller';

export async function testApiApiRouter(fastify: FastifyInstance) {
  const controller = new TestApiApiController();

  fastify.post('/test-api-api', controller.create.bind(controller));
}