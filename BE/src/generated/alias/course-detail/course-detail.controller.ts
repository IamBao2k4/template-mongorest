import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomCourseDetailService } from '../../customs/course-detail/Customcourse-detail.service';

export class CourseDetailController {
  private service: CustomCourseDetailService;

  constructor() {
    this.service = new CustomCourseDetailService();
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