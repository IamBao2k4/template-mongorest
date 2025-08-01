import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomCourseUserStatisticService } from '../../customs/course-user-statistic/Customcourse-user-statistic.service';

export class CourseUserStatisticController {
  private service: CustomCourseUserStatisticService;

  constructor() {
    this.service = new CustomCourseUserStatisticService();
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