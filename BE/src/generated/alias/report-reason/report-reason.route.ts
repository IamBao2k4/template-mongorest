import { FastifyInstance } from 'fastify';
import { ReportReasonController } from './report-reason.controller';

export async function reportReasonRouter(fastify: FastifyInstance) {
  const controller = new ReportReasonController();

  fastify.get('/list/report-reason', controller.getList.bind(controller));
}