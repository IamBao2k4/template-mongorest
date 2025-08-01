import { FastifyInstance } from 'fastify';
import { CourseUserStatisticController } from './course-user-statistic.controller';

export async function courseUserStatisticRouter(fastify: FastifyInstance) {
  const controller = new CourseUserStatisticController();

  fastify.get('/course-user-statistic/:id', controller.getDetail.bind(controller));
}