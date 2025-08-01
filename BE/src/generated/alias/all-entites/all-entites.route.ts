import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AllEntitesController } from './all-entites.controller';

export async function allEntitesRouter(fastify: FastifyInstance) {
  const controller = new AllEntitesController();

  fastify.addHook('onSend', hello);

  fastify.get('/list/all-entites' ,controller.getList.bind(controller));
}

async function hello(
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown
): Promise<unknown> {
  // Empty interceptor, returns original payload
  return payload;
}