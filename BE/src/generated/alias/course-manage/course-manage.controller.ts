import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomCourseManageService } from '../../customs/course-manage/Customcourse-manage.service';

export class CourseManageController {
  private service: CustomCourseManageService;

  constructor() {
    this.service = new CustomCourseManageService();
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