import { FastifyInstance } from 'fastify';
import { TweetsGroupController } from './tweets-group.controller';

export async function tweetsGroupRouter(fastify: FastifyInstance) {
  const controller = new TweetsGroupController();

  fastify.get('/list/tweets-group', controller.getList.bind(controller));
  fastify.get('/tweets-group/:id', controller.getDetail.bind(controller));
  fastify.post('/tweets-group', controller.create.bind(controller));
  fastify.put('/tweets-group/:id', controller.update.bind(controller));
  fastify.delete('/tweets-group/:id', controller.delete.bind(controller));
}