import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomSocialSearchService } from '../../customs/social-search/Customsocial-search.service';

export class SocialSearchController {
  private service: CustomSocialSearchService;

  constructor() {
    this.service = new CustomSocialSearchService();
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