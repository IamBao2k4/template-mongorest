import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTweetService } from '../../customs/tweet/Customtweet.service';

export class TweetController {
  private service: CustomTweetService;

  constructor() {
    this.service = new CustomTweetService();
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