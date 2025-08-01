import { FastifyInstance } from 'fastify';
import { GroupSettingController } from './group-setting.controller';

export async function groupSettingRouter(fastify: FastifyInstance) {
  const controller = new GroupSettingController();

  fastify.put('/group-setting/:id', controller.update.bind(controller));
}