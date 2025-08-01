import { FastifyInstance } from 'fastify';
import { GroupsPinController } from './groups-pin.controller';

export async function groupsPinRouter(fastify: FastifyInstance) {
  const controller = new GroupsPinController();

  fastify.get('/list/groups-pin', controller.getList.bind(controller));
  fastify.post('/groups-pin', controller.create.bind(controller));
  fastify.delete('/groups-pin/:id', controller.delete.bind(controller));
  fastify.put('/groups-pin/:id', controller.update.bind(controller));
}