import { FastifyInstance } from 'fastify';
import { ProjectController } from './project.controller';

export async function projectRouter(fastify: FastifyInstance) {
  const controller = new ProjectController();

  fastify.post('/project', controller.create.bind(controller));
  fastify.put('/project/:id', controller.update.bind(controller));
  fastify.delete('/project/:id', controller.delete.bind(controller));
  fastify.get('/project/:id', controller.getDetail.bind(controller));
  fastify.get('/list/project', controller.getList.bind(controller));
}