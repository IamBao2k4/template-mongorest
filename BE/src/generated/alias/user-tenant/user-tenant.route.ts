import { FastifyInstance } from 'fastify';
import { UserTenantController } from './user-tenant.controller';

export async function userTenantRouter(fastify: FastifyInstance) {
  const controller = new UserTenantController();

  fastify.get('/list/user-tenant', controller.getList.bind(controller));
}