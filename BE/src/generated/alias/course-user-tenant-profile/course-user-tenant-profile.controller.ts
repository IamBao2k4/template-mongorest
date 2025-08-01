import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomCourseUserTenantProfileService } from '../../customs/course-user-tenant-profile/Customcourse-user-tenant-profile.service';

export class CourseUserTenantProfileController {
  private service: CustomCourseUserTenantProfileService;

  constructor() {
    this.service = new CustomCourseUserTenantProfileService();
  }


  async getDetail(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getDetail(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }




  // Custom methods can be added here
}