import { FastifyInstance } from 'fastify';
import { UserProgressController } from './user-progress.controller';

export async function userProgressRouter(fastify: FastifyInstance) {
  const controller = new UserProgressController();

  fastify.post('/user-progress', controller.create.bind(controller));
  fastify.delete('/user-progress/:id', controller.delete.bind(controller));
}