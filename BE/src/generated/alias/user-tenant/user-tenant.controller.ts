import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomUserTenantService } from '../../customs/user-tenant/Customuser-tenant.service';

export class UserTenantController {
  private service: CustomUserTenantService;

  constructor() {
    this.service = new CustomUserTenantService();
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