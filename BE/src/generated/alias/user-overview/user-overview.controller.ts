import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomUserOverviewService } from '../../customs/user-overview/Customuser-overview.service';

export class UserOverviewController {
  private service: CustomUserOverviewService;

  constructor() {
    this.service = new CustomUserOverviewService();
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