import { FastifyInstance } from 'fastify';
import { GroupReportsController } from './group-reports.controller';

export async function groupReportsRouter(fastify: FastifyInstance) {
  const controller = new GroupReportsController();

  fastify.get('/list/group-reports', controller.getList.bind(controller));
  fastify.post('/group-reports', controller.create.bind(controller));
  fastify.delete('/group-reports/:id', controller.delete.bind(controller));
}