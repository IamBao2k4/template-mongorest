import { FastifyInstance } from 'fastify';
import { ChapterController } from './chapter.controller';

export async function chapterRouter(fastify: FastifyInstance) {
  const controller = new ChapterController();

  fastify.post('/chapter', controller.create.bind(controller));
  fastify.put('/chapter/:id', controller.update.bind(controller));
  fastify.get('/list/chapter', controller.getList.bind(controller));
  fastify.delete('/chapter/:id', controller.delete.bind(controller));
}