import { FastifyInstance } from 'fastify';
import { GroupMenuItemController } from './group-menu-item.controller';

export async function groupMenuItemRouter(fastify: FastifyInstance) {
  const controller = new GroupMenuItemController();

  fastify.get('/list/group-menu-item', controller.getList.bind(controller));
  fastify.post('/group-menu-item', controller.create.bind(controller));
  fastify.put('/group-menu-item/:id', controller.update.bind(controller));
  fastify.get('/group-menu-item/:id', controller.getDetail.bind(controller));
  fastify.delete('/group-menu-item/:id', controller.delete.bind(controller));
}