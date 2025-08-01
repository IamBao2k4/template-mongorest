import { FastifyInstance } from 'fastify';
import { AreaController } from './area.controller';

export async function areaRouter(fastify: FastifyInstance) {
  const controller = new AreaController();

  fastify.get('/list/area', controller.getList.bind(controller));
}