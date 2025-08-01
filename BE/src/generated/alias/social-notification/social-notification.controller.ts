import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomSocialNotificationService } from '../../customs/social-notification/Customsocial-notification.service';

export class SocialNotificationController {
  private service: CustomSocialNotificationService;

  constructor() {
    this.service = new CustomSocialNotificationService();
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





  async delete(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.delete(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }

  // Custom methods can be added here
}