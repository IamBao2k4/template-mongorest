import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomFollowingService } from '../../customs/following/Customfollowing.service';

export class FollowingController {
  private service: CustomFollowingService;

  constructor() {
    this.service = new CustomFollowingService();
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