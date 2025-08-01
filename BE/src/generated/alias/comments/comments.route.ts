import { FastifyInstance } from 'fastify';
import { CommentsController } from './comments.controller';

export async function commentsRouter(fastify: FastifyInstance) {
  const controller = new CommentsController();

  fastify.post('/comments', controller.create.bind(controller));
  fastify.get('/list/comments', controller.getList.bind(controller));
  fastify.put('/comments/:id', controller.update.bind(controller));
  fastify.delete('/comments/:id', controller.delete.bind(controller));
}