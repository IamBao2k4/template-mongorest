import { FastifyInstance } from 'fastify';
import { CourseUserTenantProfileController } from './course-user-tenant-profile.controller';

export async function courseUserTenantProfileRouter(fastify: FastifyInstance) {
  const controller = new CourseUserTenantProfileController();

  fastify.get('/course-user-tenant-profile/:id', controller.getDetail.bind(controller));
}