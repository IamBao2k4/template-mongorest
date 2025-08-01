import { FastifyInstance } from 'fastify';
import { DiscussionPinController } from './discussion-pin.controller';

export async function discussionPinRouter(fastify: FastifyInstance) {
  const controller = new DiscussionPinController();

  fastify.post('/discussion-pin', controller.create.bind(controller));
  fastify.get('/list/discussion-pin', controller.getList.bind(controller));
  fastify.delete('/discussion-pin/:id', controller.delete.bind(controller));
}