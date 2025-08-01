import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomUserTweetLikedService } from '../../customs/user-tweet-liked/Customuser-tweet-liked.service';

export class UserTweetLikedController {
  private service: CustomUserTweetLikedService;

  constructor() {
    this.service = new CustomUserTweetLikedService();
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