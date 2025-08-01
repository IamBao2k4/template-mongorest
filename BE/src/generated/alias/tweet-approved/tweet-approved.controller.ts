import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTweetApprovedService } from '../../customs/tweet-approved/Customtweet-approved.service';

export class TweetApprovedController {
  private service: CustomTweetApprovedService;

  constructor() {
    this.service = new CustomTweetApprovedService();
  }




  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.update(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }


  // Custom methods can be added here
}