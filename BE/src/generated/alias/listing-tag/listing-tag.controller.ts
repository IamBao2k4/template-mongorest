import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomListingTagService } from '../../customs/listing-tag/Customlisting-tag.service';

export class ListingTagController {
  private service: CustomListingTagService;

  constructor() {
    this.service = new CustomListingTagService();
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