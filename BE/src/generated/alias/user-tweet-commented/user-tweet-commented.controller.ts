import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomUserTweetCommentedService } from '../../customs/user-tweet-commented/Customuser-tweet-commented.service';

export class UserTweetCommentedController {
  private service: CustomUserTweetCommentedService;

  constructor() {
    this.service = new CustomUserTweetCommentedService();
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