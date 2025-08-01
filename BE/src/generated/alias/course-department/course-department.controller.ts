import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomCourseDepartmentService } from '../../customs/course-department/Customcourse-department.service';

export class CourseDepartmentController {
  private service: CustomCourseDepartmentService;

  constructor() {
    this.service = new CustomCourseDepartmentService();
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