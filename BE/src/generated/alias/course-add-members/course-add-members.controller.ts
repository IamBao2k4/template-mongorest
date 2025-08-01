import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomCourseAddMembersService } from '../../customs/course-add-members/Customcourse-add-members.service';

export class CourseAddMembersController {
  private service: CustomCourseAddMembersService;

  constructor() {
    this.service = new CustomCourseAddMembersService();
  }

  async getList(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getList(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }





  // Custom methods can be added here
}