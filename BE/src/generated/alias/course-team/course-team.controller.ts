import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomCourseTeamService } from '../../customs/course-team/Customcourse-team.service';

export class CourseTeamController {
  private service: CustomCourseTeamService;

  constructor() {
    this.service = new CustomCourseTeamService();
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