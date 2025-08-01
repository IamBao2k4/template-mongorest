import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomSocialRegisterEventService } from '../../customs/social-register-event/Customsocial-register-event.service';

export class SocialRegisterEventController {
  private service: CustomSocialRegisterEventService;

  constructor() {
    this.service = new CustomSocialRegisterEventService();
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

  // Custom methods can be added here
}