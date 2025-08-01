import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomUserCollectionTweetService } from '../../customs/user-collection-tweet/Customuser-collection-tweet.service';

export class UserCollectionTweetController {
  private service: CustomUserCollectionTweetService;

  constructor() {
    this.service = new CustomUserCollectionTweetService();
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