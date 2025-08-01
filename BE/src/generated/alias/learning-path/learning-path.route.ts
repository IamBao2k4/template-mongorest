import { FastifyInstance } from 'fastify';
import { LearningPathController } from './learning-path.controller';

export async function learningPathRouter(fastify: FastifyInstance) {
  const controller = new LearningPathController();

  fastify.post('/learning-path', controller.create.bind(controller));
  fastify.get('/list/learning-path', controller.getList.bind(controller));
  fastify.get('/learning-path/:id', controller.getDetail.bind(controller));
  fastify.delete('/learning-path/:id', controller.delete.bind(controller));
  fastify.put('/learning-path/:id', controller.update.bind(controller));
}