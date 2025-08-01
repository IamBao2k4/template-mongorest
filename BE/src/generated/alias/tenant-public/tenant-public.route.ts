import { FastifyInstance } from 'fastify';
import { TenantPublicController } from './tenant-public.controller';

export async function tenantPublicRouter(fastify: FastifyInstance) {
  const controller = new TenantPublicController();

  fastify.get('/list/tenant-public', controller.getList.bind(controller));
}