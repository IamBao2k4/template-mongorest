import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomSearchService } from '../../customs/search/Customsearch.service';

export class SearchController {
  private service: CustomSearchService;

  constructor() {
    this.service = new CustomSearchService();
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