import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomListingTweetSavedService } from '../../customs/listing-tweet-saved/Customlisting-tweet-saved.service';

export class ListingTweetSavedController {
  private service: CustomListingTweetSavedService;

  constructor() {
    this.service = new CustomListingTweetSavedService();
  }



  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.create(request);
      reply.code(201).send(result);
    } catch (error) {
      reply.send(error);
    }
  }






  async delete(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.delete(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
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