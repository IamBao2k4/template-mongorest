import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomCourseMemberService } from '../../customs/course-member/Customcourse-member.service';

export class CourseMemberController {
  private service: CustomCourseMemberService;

  constructor() {
    this.service = new CustomCourseMemberService();
  }








  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.update(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }


  // Custom methods can be added here
}