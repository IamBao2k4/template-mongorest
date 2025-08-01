import { FastifyInstance } from 'fastify';
import { RequestJoinGroupController } from './request-join-group.controller';

export async function requestJoinGroupRouter(fastify: FastifyInstance) {
  const controller = new RequestJoinGroupController();

  fastify.post('/request-join-group', controller.create.bind(controller));
  fastify.get('/list/request-join-group', controller.getList.bind(controller));
  fastify.delete('/request-join-group/:id', controller.delete.bind(controller));
  fastify.put('/request-join-group/:id', controller.update.bind(controller));
}