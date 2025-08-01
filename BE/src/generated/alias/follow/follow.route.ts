import { FastifyInstance } from 'fastify';
import { FollowController } from './follow.controller';

export async function followRouter(fastify: FastifyInstance) {
  const controller = new FollowController();

  fastify.post('/follow', controller.create.bind(controller));
  fastify.delete('/follow/:id', controller.delete.bind(controller));
}