import { FastifyRequest } from 'fastify';
import { CourseUserTenantProfileService } from '../../alias/course-user-tenant-profile/course-user-tenant-profile.service'

export class CustomCourseUserTenantProfileService extends CourseUserTenantProfileService {

  constructor() {
    super()
  }
}