import { FastifyInstance } from 'fastify';
import { LikeController } from './like.controller';

export async function likeRouter(fastify: FastifyInstance) {
  const controller = new LikeController();

  fastify.post('/like', controller.create.bind(controller));
  fastify.delete('/like/:id', controller.delete.bind(controller));
}