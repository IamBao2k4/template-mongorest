import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomListingTagGroupService } from '../../customs/listing-tag-group/Customlisting-tag-group.service';

export class ListingTagGroupController {
  private service: CustomListingTagGroupService;

  constructor() {
    this.service = new CustomListingTagGroupService();
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