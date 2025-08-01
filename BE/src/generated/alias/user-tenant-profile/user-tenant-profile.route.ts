import { FastifyInstance } from 'fastify';
import { UserTenantProfileController } from './user-tenant-profile.controller';

export async function userTenantProfileRouter(fastify: FastifyInstance) {
  const controller = new UserTenantProfileController();

  fastify.put('/user-tenant-profile/:id', controller.update.bind(controller));
  fastify.post('/user-tenant-profile', controller.create.bind(controller));
  fastify.get('/list/user-tenant-profile', controller.getList.bind(controller));
  fastify.get('/user-tenant-profile/:id', controller.getDetail.bind(controller));
}