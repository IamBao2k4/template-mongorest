import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTweetRelativeService } from '../../customs/tweet-relative/Customtweet-relative.service';

export class TweetRelativeController {
  private service: CustomTweetRelativeService;

  constructor() {
    this.service = new CustomTweetRelativeService();
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