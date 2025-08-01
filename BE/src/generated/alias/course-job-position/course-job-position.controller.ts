import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomCourseJobPositionService } from '../../customs/course-job-position/Customcourse-job-position.service';

export class CourseJobPositionController {
  private service: CustomCourseJobPositionService;

  constructor() {
    this.service = new CustomCourseJobPositionService();
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