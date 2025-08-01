import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomUserCountService } from '../../customs/user-count/Customuser-count.service';

export class UserCountController {
  private service: CustomUserCountService;

  constructor() {
    this.service = new CustomUserCountService();
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