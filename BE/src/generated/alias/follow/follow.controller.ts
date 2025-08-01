import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomFollowService } from '../../customs/follow/Customfollow.service';

export class FollowController {
  private service: CustomFollowService;

  constructor() {
    this.service = new CustomFollowService();
  }



  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.create(request);
      reply.code(201).send(result);
    } catch (error) {
      reply.send(error);
    }
  }






  async delete(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.delete(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }

  // Custom methods can be added here
}