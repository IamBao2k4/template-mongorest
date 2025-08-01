import { FastifyInstance } from 'fastify';
import { CourseStatisticController } from './course-statistic.controller';

export async function courseStatisticRouter(fastify: FastifyInstance) {
  const controller = new CourseStatisticController();

  fastify.get('/course-statistic/:id', controller.getDetail.bind(controller));
  fastify.get('/list/course-statistic', controller.getList.bind(controller));
}