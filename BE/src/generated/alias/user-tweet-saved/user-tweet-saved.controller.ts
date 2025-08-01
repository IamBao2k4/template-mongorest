import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomUserTweetSavedService } from '../../customs/user-tweet-saved/Customuser-tweet-saved.service';

export class UserTweetSavedController {
  private service: CustomUserTweetSavedService;

  constructor() {
    this.service = new CustomUserTweetSavedService();
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