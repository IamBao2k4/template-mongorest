import { FastifyInstance } from 'fastify';
import { DiscussionController } from './discussion.controller';

export async function discussionRouter(fastify: FastifyInstance) {
  const controller = new DiscussionController();

  fastify.post('/discussion', controller.create.bind(controller));
  fastify.put('/discussion/:id', controller.update.bind(controller));
  fastify.delete('/discussion/:id', controller.delete.bind(controller));
  fastify.get('/list/discussion', controller.getList.bind(controller));
  fastify.get('/discussion/:id', controller.getDetail.bind(controller));
}