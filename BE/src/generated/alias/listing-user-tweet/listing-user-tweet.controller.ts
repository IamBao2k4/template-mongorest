import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomListingUserTweetService } from '../../customs/listing-user-tweet/Customlisting-user-tweet.service';

export class ListingUserTweetController {
  private service: CustomListingUserTweetService;

  constructor() {
    this.service = new CustomListingUserTweetService();
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