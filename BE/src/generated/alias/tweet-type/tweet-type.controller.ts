import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTweetTypeService } from '../../customs/tweet-type/Customtweet-type.service';

export class TweetTypeController {
  private service: CustomTweetTypeService;

  constructor() {
    this.service = new CustomTweetTypeService();
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