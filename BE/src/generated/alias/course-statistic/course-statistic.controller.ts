import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomCourseStatisticService } from '../../customs/course-statistic/Customcourse-statistic.service';

export class CourseStatisticController {
  private service: CustomCourseStatisticService;

  constructor() {
    this.service = new CustomCourseStatisticService();
  }


  async getDetail(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getDetail(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
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