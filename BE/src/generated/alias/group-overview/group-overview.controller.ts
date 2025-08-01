import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomGroupOverviewService } from '../../customs/group-overview/Customgroup-overview.service';

export class GroupOverviewController {
  private service: CustomGroupOverviewService;

  constructor() {
    this.service = new CustomGroupOverviewService();
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