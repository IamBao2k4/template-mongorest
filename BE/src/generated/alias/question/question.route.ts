import { FastifyInstance } from 'fastify';
import { QuestionController } from './question.controller';

export async function questionRouter(fastify: FastifyInstance) {
  const controller = new QuestionController();

  fastify.post('/question', controller.create.bind(controller));
  fastify.get('/list/question', controller.getList.bind(controller));
  fastify.delete('/question/:id', controller.delete.bind(controller));
  fastify.get('/question/:id', controller.getDetail.bind(controller));
  fastify.put('/question/:id', controller.update.bind(controller));
}