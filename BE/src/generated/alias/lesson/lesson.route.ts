import { FastifyInstance } from 'fastify';
import { LessonController } from './lesson.controller';

export async function lessonRouter(fastify: FastifyInstance) {
  const controller = new LessonController();

  fastify.post('/lesson', controller.create.bind(controller));
  fastify.put('/lesson/:id', controller.update.bind(controller));
  fastify.get('/list/lesson', controller.getList.bind(controller));
  fastify.get('/lesson/:id', controller.getDetail.bind(controller));
  fastify.delete('/lesson/:id', controller.delete.bind(controller));
}