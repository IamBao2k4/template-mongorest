import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomSocialUserService } from '../../customs/social-user/Customsocial-user.service';

export class SocialUserController {
  private service: CustomSocialUserService;

  constructor() {
    this.service = new CustomSocialUserService();
  }

  async getList(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getList(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }







  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.update(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }


  // Custom methods can be added here
}