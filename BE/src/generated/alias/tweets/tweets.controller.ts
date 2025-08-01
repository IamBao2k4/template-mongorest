import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTweetsService } from '../../customs/tweets/Customtweets.service';

export class TweetsController {
  private service: CustomTweetsService;

  constructor() {
    this.service = new CustomTweetsService();
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