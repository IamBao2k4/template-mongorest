import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomUserTweetsService } from '../../customs/user-tweets/Customuser-tweets.service';

export class UserTweetsController {
  private service: CustomUserTweetsService;

  constructor() {
    this.service = new CustomUserTweetsService();
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