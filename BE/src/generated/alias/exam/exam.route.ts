import { FastifyInstance } from 'fastify';
import { ExamController } from './exam.controller';

export async function examRouter(fastify: FastifyInstance) {
  const controller = new ExamController();

  fastify.post('/exam', controller.create.bind(controller));
  fastify.get('/list/exam', controller.getList.bind(controller));
  fastify.put('/exam/:id', controller.update.bind(controller));
  fastify.delete('/exam/:id', controller.delete.bind(controller));
  fastify.get('/exam/:id', controller.getDetail.bind(controller));
}