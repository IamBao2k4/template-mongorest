import { FastifyInstance } from 'fastify';
import { TesttApiController } from './testt-api.controller';

export async function testtApiRouter(fastify: FastifyInstance) {
  const controller = new TesttApiController();

  fastify.post('/testt-api', controller.create.bind(controller));
}