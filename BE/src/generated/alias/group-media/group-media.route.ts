import { FastifyInstance } from 'fastify';
import { GroupMediaController } from './group-media.controller';

export async function groupMediaRouter(fastify: FastifyInstance) {
  const controller = new GroupMediaController();

  fastify.get('/list/group-media', controller.getList.bind(controller));
}