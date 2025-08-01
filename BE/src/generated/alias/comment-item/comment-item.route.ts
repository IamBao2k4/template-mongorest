import { FastifyInstance } from 'fastify';
import { CommentItemController } from './comment-item.controller';

export async function commentItemRouter(fastify: FastifyInstance) {
  const controller = new CommentItemController();

  fastify.get('/list/comment-item', controller.getList.bind(controller));
}