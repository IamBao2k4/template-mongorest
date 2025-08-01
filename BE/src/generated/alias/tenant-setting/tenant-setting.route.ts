import { FastifyInstance } from 'fastify';
import { TenantSettingController } from './tenant-setting.controller';

export async function tenantSettingRouter(fastify: FastifyInstance) {
  const controller = new TenantSettingController();

  fastify.get('/list/tenant-setting', controller.getList.bind(controller));
}