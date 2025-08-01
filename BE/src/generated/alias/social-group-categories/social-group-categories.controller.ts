import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomSocialGroupCategoriesService } from '../../customs/social-group-categories/Customsocial-group-categories.service';

export class SocialGroupCategoriesController {
  private service: CustomSocialGroupCategoriesService;

  constructor() {
    this.service = new CustomSocialGroupCategoriesService();
  }


  async getDetail(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getDetail(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }












  // Custom methods can be added here
}