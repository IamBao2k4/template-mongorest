import { FastifyInstance } from 'fastify';
import { GroupMembersController } from './group-members.controller';

export async function groupMembersRouter(fastify: FastifyInstance) {
  const controller = new GroupMembersController();

  fastify.get('/list/group-members', controller.getList.bind(controller));
  fastify.post('/group-members', controller.create.bind(controller));
  fastify.put('/group-members/:id', controller.update.bind(controller));
  fastify.delete('/group-members/:id', controller.delete.bind(controller));
}