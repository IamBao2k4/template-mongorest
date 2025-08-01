import { FastifyInstance } from 'fastify';
import { UserCollectionController } from './user-collection.controller';

export async function userCollectionRouter(fastify: FastifyInstance) {
  const controller = new UserCollectionController();

  fastify.get('/user-collection/:id', controller.getDetail.bind(controller));
  fastify.get('/list/user-collection', controller.getList.bind(controller));
  fastify.post('/user-collection', controller.create.bind(controller));
  fastify.delete('/user-collection/:id', controller.delete.bind(controller));
  fastify.put('/user-collection/:id', controller.update.bind(controller));
}