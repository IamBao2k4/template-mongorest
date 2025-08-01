import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomFollowersService } from '../../customs/followers/Customfollowers.service';

export class FollowersController {
  private service: CustomFollowersService;

  constructor() {
    this.service = new CustomFollowersService();
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