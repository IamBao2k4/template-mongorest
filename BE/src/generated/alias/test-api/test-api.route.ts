import { FastifyInstance } from 'fastify';
import { TestApiController } from './test-api.controller';

export async function testApiRouter(fastify: FastifyInstance) {
  const controller = new TestApiController();

}